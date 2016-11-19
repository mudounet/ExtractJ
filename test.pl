#!/usr/bin/perl

use POSIX;
use strict;
use warnings;

my $maxLesson = 112 ; # nombre maxi de lecons
my $phaseActive = 71; # phase active seule
my $maxModule = ceil ($maxLesson/7);
my $link_base = 'http://cours.toutapprendre.com/eja0a/';

use constant GRAMMARY => 1;
use constant LISTENING => 2;
use constant ACTIVE => 3;
use constant EXT => '.asp';

for my $lesson(1..$maxLesson) {
	my ($type, $linkExt) = getTypeLesson($lesson);
	if($type eq GRAMMARY) {
		getPage($link_base, 'revGrammaticale'.EXT.$linkExt);
	}
	elsif ($type eq LISTENING) {
		getPage($link_base, 'ecoute'.EXT.$linkExt, 'apprentissage'.EXT.$linkExt);
	}
	elsif($type eq ACTIVE) {
		getPage($link_base, 'revisionActive'.EXT.$linkExt, 'exTraduction'.EXT.$linkExt);
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
	if($l < $phaseActive) {
		if($l == ($m*7) && $l !=70) {
			$type = GRAMMARY;
		} else {
			$type = LISTENING;
		}
	} else {
		$type = ACTIVE;
	}
	return ($type, $link)
}

###################################################################
#	Ecoute
##################################################################
#var cheminSons = 'eja0a/sons/';
#var nextUrl = 'apprentissage' + ext + '?l=' + l +'&m=' + m + '&num=' + num;
#var propREp ='eja0a/properties/';
#var properties = propREp + 'DataL' + l + '.properties';
##################################################################
#	Phase active
##################################################################
#extUrl='exTraduction' + ext + '?l='+l;