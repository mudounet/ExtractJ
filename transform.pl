#!/usr/bin/perl

use POSIX;
use strict;
use warnings;
use Log::Log4perl qw(:easy);
use Data::Dumper;
use Readonly;
use File::Path;
use Text::Diff;

Log::Log4perl->easy_init($DEBUG);

my $maxLesson = 112 ; # nombre maxi de lecons
my $phaseMixte = 50; # Phase mixte
my $phaseActive = 71; # phase active seule
my $maxModule = ceil ($maxLesson/7);
my $link_base = 'http://cours.toutapprendre.com/eja0a/';

Readonly my $GRAMMARY => 1;
Readonly my $GRAMMARY_AND_ACTIVE => 2;
Readonly my $LISTENING => 3;
Readonly my $LISTENING_AND_ACTIVE => 4;
Readonly my $ACTIVE => 5;
Readonly my $EXT => '.asp';
Readonly my $DIR_SOUNDS => 'eja0a/sons/';
Readonly my $REF_DIR => './ref_files/eja0a/';
Readonly my $OUT_DIR => './output/';

rmtree $OUT_DIR;
mkdir $OUT_DIR;

opendir my $DIR, $REF_DIR or die $!;
my %lastFileSameCat;

my @categories = qw/apprentissage apprentissagejs ex7Dragdrop exMotsManquants exMotsManquantsActive exTraduction exTraductionActive exTraductionL7 exTraductionTheme revGrammaticale/;

while (my $file = readdir($DIR)) {
	next if -d $REF_DIR.$file;
	if($file =~ /^(.*)\.asp\@l=(\d+)/) {
		my $fileCatName = $1;
		my $lesson_idx = $2;
		my @expected_varArrayNames = ();
		my @expected_varStrNames = ();
		my @lines;
		
		my $commonSectionRan = 0;
		if(grep { $fileCatName eq $_ } @categories) {
			#runCommonSeq($REF_DIR.$lastFileSameCat{$fileCatName}, $REF_DIR.$file) if defined $lastFileSameCat{$fileCatName};
			
			@lines = getJavaScriptContents($REF_DIR.$file, 1);
			WARN "${file} returns no result" unless @lines;
			
			$commonSectionRan = 1;
		}
		
		if ($fileCatName eq 'apprentissage') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'apprentissagejs') {
			@expected_varArrayNames = qw/tabPhrasesText tabNotes/;
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'ex7Dragdrop') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'exMotsManquants') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'exMotsManquantsActive') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'exTraduction') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'exTraductionActive') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'exTraductionL7') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'exTraductionTheme') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'revGrammaticale') {
			checkCommonSeq($commonSectionRan);
		}
		else {
			print "File category : $fileCatName is not processed yet\n";
			<>;
			next;
		}
		
		my %conv_results = convertJavascriptToPerl(@lines);
		my %data = extract_javascript_as_array($conv_results{conv_text});
		
		open my $OUTFILE, ">${OUT_DIR}${file}" or LOGDIE "Cannot write ${OUT_DIR}${file}";
		if(%data) {
			print $OUTFILE Dumper \%data;
		}
		else {
			print $OUTFILE Dumper \%conv_results;
		}

		close $OUTFILE;
		$lastFileSameCat{$fileCatName} = $file;
	}
	else {
		INFO "HTML files are not processed..." and next if($file =~ /\.html$/);
		print "Not matched : $file\n";
		<>;
	}
}

closedir($DIR);
exit;

sub checkCommonSeq {
	my ($ran) = @_;
	return if $ran;
	print "Section not ran\n";
	<>;
}

sub runCommonSeq {
	my ($file, $oldFile) = @_;
	
	my $diff = diff ($file, $oldFile, { STYLE => 'OldStyle' });
	print Dumper $diff;
	print "Hello";
}

sub extract_javascript_as_array {
	DEBUG "Extracting page";
	my ($text_perl) = @_;

	my (@tabPhrasesText, @tabNotes, $commentaire);
	unless (eval ($text_perl)) {
		open my $out, '>', 'DIE_ON_EVAL.txt';
		print $out $text_perl;
		close $out;
		ERROR("Problem with eval. See DIE_ON_EVAL.txt for investigations.\n$!");
		return ();
	}
	shift @tabPhrasesText;
	shift @tabNotes;
	
	my %results = ();
	$results{tabPhrasesText} = \@tabPhrasesText if @tabPhrasesText;
	$results{tabNotes} = \@tabNotes if @tabNotes;
	$results{commentaire} = $commentaire if $commentaire;
	
	return %results;
}

sub getJavaScriptContents {
	my ($filename, $extractJavascript, @javascriptToKeep) = @_;
	DEBUG "Opening ".$filename;
	open my $in, '<', $filename or LOGDIE "Not possible to access $filename in read-only : $!";
	chomp(my @lines = <$in>);
	close $in;
	
	if ($extractJavascript) {
		my $lines = join("\n",@lines);
		@lines = ($lines =~ m/<script type="text\/javascript">(.*?)<\/script>/igs);
		
		return ($lines) unless @lines;
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
	
	return (conv_text => $lines, found_arrays => \@matches_array, found_str => \@matches_normal_vars);
}