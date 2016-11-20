#!/usr/bin/perl

use POSIX;
use strict;
use warnings;
use Log::Log4perl qw(:easy);
use Switch;
use Data::Dumper;

Log::Log4perl->easy_init($DEBUG);

my $maxLesson = 112 ; # nombre maxi de lecons
my $phaseMixte = 50; # Phase mixte
my $phaseActive = 71; # phase active seule
my $maxModule = ceil ($maxLesson/7);
my $link_base = 'http://cours.toutapprendre.com/eja0a/';

use constant GRAMMARY => 1;
use constant GRAMMARY_AND_ACTIVE => 2;
use constant LISTENING => 3;
use constant LISTENING_AND_ACTIVE => 4;
use constant ACTIVE => 5;
use constant EXT => '.asp';
use constant DIR_SOUNDS => 'eja0a/sons/';
use constant REF_DIR => './ref_files/eja0a/';

unlink 'wget_log.txt';
for my $lesson(1..$maxLesson) {
	my ($type, $linkExt) = getTypeLesson($lesson);
	INFO "Currently at lesson #".sprintf("%03d", $lesson);
	my %results;
	switch ($type) {
		case GRAMMARY { extract_grammary($lesson, $linkExt); }
		case LISTENING { %results = extract_apprentissage($lesson, $linkExt); }
		case GRAMMARY_AND_ACTIVE { extract_grammary_and_active($lesson, $linkExt); }
		case LISTENING_AND_ACTIVE { extract_listening_and_active($lesson, $linkExt); }
		case ACTIVE { extract_active($lesson, $linkExt); }
		else { ERROR "No valid type found for lesson #".sprintf("%03d", $lesson); }
	}
}

sub extract_grammary {
	DEBUG "Processing grammary type";
}

sub extract_apprentissage {
	DEBUG "Processing apprentissage page";
	my ($lesson, $linkExt) = @_;
	my @lines = getJavaScriptContents("apprentissagejs.asp\@l=$lesson");
	my $text_perl = convertJavascriptToPerl(@lines);

	my (@tabPhrasesText, @tabNotes, $commentaire);
	unless (eval($text_perl)) {
		open my $out, '>', 'DIE_ON_EVAL.txt';
		print $out $text_perl;
		close $out;
		LOGDIE("Problem with eval. See DIE_ON_EVAL.txt for investigations.\n$!");
	}
	return ( 'Sentences' => \@tabPhrasesText, 'Notes' => \@tabNotes, 'Comments' => $commentaire );
}

sub extract_grammary_and_active {
	DEBUG "Processing grammary and active type, with type grammary";
	extract_grammary(@_);
}

sub extract_listening_and_active {
	DEBUG "Processing listening and active type";
}

sub extract_active {
	DEBUG "Processing active type";
}

sub getJavaScriptContents {
	my ($filename, $extractJavascript, @javascriptToKeep) = @_;
	DEBUG "Opening ".REF_DIR.$filename;
	open my $in, '<', REF_DIR.$filename or LOGDIE "Not possible to access $filename in read-only : $!";
	chomp(my @lines = <$in>);
	close $in;
	
	if ($extractJavascript) {
		my $lines = join("\n",@lines);
		@lines = ($lines =~ m/<script type="text\/javascript">(.*?)<\/script>/igs);
		
		return @lines unless @javascriptToKeep;
		my @sectionsToKeep = ();
		for my $idxToKeep (@javascriptToKeep) {
			push(@sectionsToKeep, $lines[$idxToKeep - 1]);
		}
		return @sectionsToKeep;
	}
	return @lines;
}

sub convertJavascriptToPerl {
	my (@lines) = @_;
	my $lines = join("\n",@lines);
	
	$lines =~ s/([\w\[\]]*)\s*=\s*\g1\s*\+\s*'/$1 .= '/g; # Replace concatenations in a PERL manner. Uses backreferences.
	
	# Replacing All array declaration
	my @matches_array = ($lines =~ m/var\s+([^=\s]*)\s*=\s*new\s+Array\(\)\s*;/g);
	for my $name_array (@matches_array) {
		DEBUG "Replacing array '$name_array'";
		$lines =~ s/var\s+${name_array}\s*=\s*new\s+Array\(\)\s*;/\@$name_array = ();/g;
		$lines =~ s/${name_array}(\[(\d+)\])/\$$name_array$1/g;
	}
	$lines =~ s/\s*=\s*new\s+Array\(\d*\)\s*;/ = ();/g;
	
	# Replacing normal variables
	my @matches_normal_vars = ($lines =~ m/var\s+([^=\s]*)\s*=/g);
	for my $name_normal_var (@matches_normal_vars) {
		DEBUG "Replacing normal variable '$name_normal_var'";
		$lines =~ s/${name_normal_var}\s*(\.?)=/\$$name_normal_var $1= /g;
		$lines =~ s/var \$${name_normal_var} =/\$$name_normal_var =/g;
	}
	
	return $lines;
}

sub getTypeLesson {
	my ($l) = @_;
	my $ext = '.asp';
	my $num = '';
	my $m = ceil($l/7);
	
	my $link = '@l=' . $l . '&m='  .  $m; # . '&num=' . $num;
	my $type;
	
	return (ACTIVE, $link) if($l >= $phaseActive);
	if ($l >= $phaseMixte) {
		return (GRAMMARY_AND_ACTIVE, $link) if($l == ($m*7) && $l !=70);
		return (LISTENING_AND_ACTIVE, $link);
	}
	return (GRAMMARY, $link) if($l == ($m*7) && $l !=70);
	return (LISTENING, $link);
}