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

for my $lesson(1..$maxLesson) {
	my ($type, $linkExt) = getTypeLesson($lesson);
	my @list_pages;
	if($type eq GRAMMARY or $type eq GRAMMARY_AND_ACTIVE) {
		@list_pages = qw(revGrammaticale conclusion ex7Dragdrop exTraductionL7); # Missing some pages
	}
	elsif ($type eq LISTENING) {
		@list_pages = qw(ecoute apprentissage exTraduction exMotsManquants conclusion);
	}
	elsif($type eq LISTENING_AND_ACTIVE) {
		@list_pages = qw(ecoute apprentissage exTraduction exMotsManquantsActive exTraductionActive conclusion);
	}
	elsif($type eq ACTIVE) {
		@list_pages = qw(revisionActive exTraductionActive exMotsManquantsActive conclusion);
	}
	getPage($link_base, EXT.$linkExt, @list_pages);
	
	for my $page_ref ( qw(exMotsManquantsActive exMotsManquants apprentissage) ){
		if (grep { $page_ref eq $_ } @list_pages) { getAudio($link_base.DIR_SOUNDS, $page_ref, $lesson); }
	}
}

sub getPage {
	my ($link_base, $linkExt, @pages) = @_;
	for my $remain_link (@pages) {
		my $link = $link_base.$remain_link.$linkExt;
		print "Downloading ".$link."\n";
		#system "./wget.exe -r -e robots=off -nH $link";
	}
}

sub getAudio {
	my ($link_base, $lessonType, $lesson) = @_;
	$lesson = sprintf("%03d", $lesson);
	my $link = $link_base.$lesson;
	
	if($lessonType eq 'exMotsManquants' or $lessonType eq 'exMotsManquantsActive') {
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
	my $resultOgg = system("./wget.exe -r -e robots=off -nH ${link}-pcm44.ogg");
	my $resultMp3 = system("./wget.exe -r -e robots=off -nH ${link}-pcm44.mp3");
	
	return ($resultOgg == 0 or $resultMp3 == 0);
}

sub getTypeLesson {
	my ($l) = @_;
	my $ext = '.asp';
	my $num = '';
	my $m = ceil($l/7);
	
	my $link = '?l=' . $l . '&m='  .  $m . '&num=' . $num;
	my $type;
	
	return (ACTIVE, $link) if($l >= $phaseActive);
	if ($l >= $phaseMixte) {
		return (GRAMMARY_AND_ACTIVE, $link) if($l == ($m*7) && $l !=70);
		return (LISTENING_AND_ACTIVE, $link);
	}
	return (GRAMMARY, $link) if($l == ($m*7) && $l !=70);
	return (LISTENING, $link);
}

###################################################################
#	All type of links
##################################################################
# document.location = 'exTraductionActive' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
# document.location = 'exTraduction' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
# document.location = 'exTraductionTheme' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
# document.location = 'apprentissage' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
# document.location = 'exTraductionL7' + ext + '?l='+ l +'&m='  +  m + '&num=' + num;
# document.location = 'ex7Dragdrop' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
# document.location = 'exMotsManquantsActive' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
# document.location = 'exMotsManquants' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
# document.location = 'assimil_index' + ext + '?l=' + l +  '&m='  +  m + '&num=' + num;
# document.location = 'introduction' + ext   + '?l=' + l +  '&m='  +  m + '&num=' + num;
# document.location = 'prononciation' + ext  + '?l=' + l + '&m='  +  m + '&num=' + num;
# document.location = 'appendiceGrammatical' + ext  + '?l=' + l + '&m='  +  m + '&num=' + num;
# document.location = 'lexiqueAF' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
# document.location = 'lexiqueFA' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
# document.location = 'indexGrammatical' + ext + '?l=' + l + ' &m=' + m + '&num=' + num ;
# document.location = 'indexThematique' + ext + '?l=' + l + ' &m=' + m+ '&num=' + num;
# document.location = 'lexique' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
# document.location = 'dialoguesRecap' + ext  +'?l=' +l +'&m='  +  m + '&num=' + num;
# document.location = 'revGrammaticale' + ext  +'?l=' +l +'&m='  +  m + '&num=' + num;
# document.location = 'conclusion' + ext +'?l=' +l +'&m='  +  m + '&num=' + num;