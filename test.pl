#!/usr/bin/perl

use POSIX;
use strict;
use warnings;

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

unlink 'wget_log.txt';
for my $lesson(1..$maxLesson) {
	my ($type, $linkExt) = getTypeLesson($lesson);
	my @list_pages = qw /conclusion revGrammaticale dialoguesRecap lexique indexThematique indexGrammatical lexiqueAF lexiqueFA appendiceGrammatical prononciation introduction assimil_index exTraductionActive exTraduction exTraductionTheme apprentissage exTraductionL7 ex7Dragdrop exMotsManquantsActive exMotsManquants/;
	getPage($link_base, EXT.$linkExt, @list_pages);
	
	for my $page_ref ( qw(exMotsManquantsActive exMotsManquants apprentissage exTraduction exTraductionActive) ){
		if (grep { $page_ref eq $_ } @list_pages) { getAudio($link_base.DIR_SOUNDS, $page_ref, $lesson); }
	}
}

sub getPage {
	my ($link_base, $linkExt, @pages) = @_;
	for my $remain_link (@pages) {
		my $link = $link_base.$remain_link.$linkExt;
		print "Downloading ".$link."\n";
		system "wget.exe -r -e robots=off -nH \"$link\" --append-output wget_log.txt";
	}
}

sub getAudio {
	my ($link_base, $lessonType, $lesson) = @_;
	$lesson = sprintf("%03d", $lesson);
	my $link = $link_base.$lesson;
	
	if($lessonType eq 'exMotsManquants' or $lessonType eq 'exMotsManquantsActive' or $lessonType eq 'exTraduction' or $lessonType eq 'exTraductionActive') {
		for my $sentence (1..99) {
			my $sentenceLink = $link.'EA'.sprintf("%02d", $sentence);
			last unless getSingleAudio($sentenceLink);
		}
	}
	elsif($lessonType eq 'apprentissage') {
		getSingleAudio($link);
		getSingleAudio($link.'T');
		for my $sentence (1..99) {
			my $sentenceLink = $link.'D'.sprintf("%02d", $sentence);
			last unless getSingleAudio($sentenceLink);
		}
	}
}

sub getSingleAudio {
	my ($link) = @_;
	print "Downloading audio ".$link."\n";
	my $resultOgg = system("wget.exe -r -e robots=off -nH \"${link}-pcm44.ogg\" --append-output wget_log.txt");
	my $resultMp3 = system("wget.exe -r -e robots=off -nH \"${link}-pcm44.mp3\" --append-output wget_log.txt");
	
	return ($resultOgg == 0 or $resultMp3 == 0);
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