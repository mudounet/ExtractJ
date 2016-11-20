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
	switch ($type) {
		case GRAMMARY { extract_grammary($lesson, $linkExt); }
		case LISTENING { extract_listening($lesson, $linkExt); }
		case GRAMMARY_AND_ACTIVE { extract_grammary_and_active($lesson, $linkExt); }
		case LISTENING_AND_ACTIVE { extract_listening_and_active($lesson, $linkExt); }
		case ACTIVE { extract_active($lesson, $linkExt); }
		else { ERROR "No valid type found for lesson #".sprintf("%03d", $lesson); }
	}
}

sub extract_grammary {
	DEBUG "Processing grammary type";
}

sub extract_listening {
	DEBUG "Processing listening type";
	my ($lesson, $linkExt) = @_;
	my @lines = getFileContents("apprentissagejs.asp\@l=$lesson");
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

sub getFileContents {
	my ($filename) = @_;
	DEBUG "Opening ".REF_DIR.$filename;
	open my $in, '<', REF_DIR.$filename or LOGDIE "Not possible to access $filename in read-only : $!";
	chomp(my @lines = <$in>);
	close $in;
	return @lines;
}

sub getTypeLesson {
	my ($l) = @_;
	my $ext = '.asp';
	my $num = '';
	my $m = ceil($l/7);
	
	my $link = '?l=' . $l . '&m='  .  $m; # . '&num=' . $num;
	my $type;
	
	return (ACTIVE, $link) if($l >= $phaseActive);
	if ($l >= $phaseMixte) {
		return (GRAMMARY_AND_ACTIVE, $link) if($l == ($m*7) && $l !=70);
		return (LISTENING_AND_ACTIVE, $link);
	}
	return (GRAMMARY, $link) if($l == ($m*7) && $l !=70);
	return (LISTENING, $link);
}