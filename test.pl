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
}

sub getPage {
	my ($link_base, $linkExt, @pages) = @_;
	for my $remain_link (@pages) {
		my $link = $link_base.$remain_link.$linkExt;
		print "Downloading ".$link."\n";
		#system "./wget.exe -r -e robots=off -nH $link";
	}
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