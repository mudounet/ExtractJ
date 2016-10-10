#!/usr/bin/perl

use POSIX;
use strict;
use warnings;

my $maxLesson = 112 ; # nombre maxi de lecons
my $phaseActive = 71; # phase active seule
my $maxModule = ceil ($maxLesson/7);
my $link_base = 'http://cours.toutapprendre.com/eja0a/';

for my $lesson(1..$maxLesson) {
	my $link = $link_base.genURL($lesson);
	print $link."\n";
	system "./wget.exe -r -e robots=off -nH $link"; 
}

sub genURL {
	my ($l) = @_;
	my $ext = '.asp';
	my $num = '';
	my $m = ceil($l/7);
	
	my $link;
	if($l < $phaseActive){
		if($l == ($m*7) && $l !=70) {
			$link = 'revGrammaticale' . $ext . '?l=' . $l . '&m='  .  $m . '&num=' . $num;
		} else {
			$link = 'ecoute' . $ext . '?l=' . $l . '&m=' . $m . '&num=' . $num;
		}
	} else {
		$link = 'revisionActive' . $ext . '?l=' . $l . '&m=' . $m . '&num=' . $num;
	}
	return $link;

}