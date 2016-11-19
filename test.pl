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
	if($type eq GRAMMARY or $type eq GRAMMARY_AND_ACTIVE) {
		getPage($link_base, 'revGrammaticale'.EXT.$linkExt, 'conclusion'.EXT.$linkExt, 'ex7Dragdrop'.EXT.$linkExt, 'exTraductionL7'.EXT.$linkExt); # Missing some pages
	}
	elsif ($type eq LISTENING) {
		getPage($link_base, 'ecoute'.EXT.$linkExt, 'apprentissage'.EXT.$linkExt, 'exTraduction'.EXT.$linkExt, 'exMotsManquants'.EXT.$linkExt, 'conclusion'.EXT.$linkExt);
	}
	elsif($type eq LISTENING_AND_ACTIVE) {
		getPage($link_base, 'ecoute'.EXT.$linkExt, 'apprentissage'.EXT.$linkExt, 'exTraduction'.EXT.$linkExt, 'exMotsManquantsActive'.EXT.$linkExt, 'exTraductionActive'.EXT.$linkExt, 'conclusion'.EXT.$linkExt);
	}
	elsif($type eq ACTIVE) {
		getPage($link_base, 'revisionActive'.EXT.$linkExt, 'exTraductionActive'.EXT.$linkExt, 'exMotsManquantsActive'.EXT.$linkExt, 'conclusion'.EXT.$linkExt);
	}
}

sub getPage {
	my ($link_base) = @_;
	for my $remain_link (@_) {
		my $link = $link_base.$remain_link;
		print "Downloading ".$link."\n";
		system "./wget.exe -r -e robots=off -nH $link"; 
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