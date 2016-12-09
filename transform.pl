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

my @categories = qw/appendiceGrammatical apprentissage apprentissagejs assimil_index ex7Dragdrop exMotsManquants exMotsManquantsActive exTraduction exTraductionActive exTraductionL7 exTraductionTheme introduction prononciation revGrammaticale/;

while (my $file = readdir($DIR)) {
	next if -d $REF_DIR.$file;
	if($file =~ /^(.*)\.asp\@l=(\d+)/) {
		my $fileCatName = $1;
		my $lesson_idx = $2;
		
		my $commonSectionRan = 0;
		if(grep { $fileCatName eq $_ } @categories) {
			#runCommonSeq($REF_DIR.$lastFileSameCat{$fileCatName}, $REF_DIR.$file) if defined $lastFileSameCat{$fileCatName};
			
			my @lines = getJavaScriptContents($REF_DIR.$file, 1);
			WARN "${file} returns no result" unless @lines;
			open my $OUTFILE, ">${OUT_DIR}${file}" or LOGDIE "Cannot write ${OUT_DIR}${file}";
			print $OUTFILE Dumper @lines;
			close $OUTFILE;
			$commonSectionRan = 1;
		}
		
		if ($fileCatName eq 'appendiceGrammatical') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'apprentissage') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'apprentissagejs') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'assimil_index') {
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
		elsif ($fileCatName eq 'introduction') {
			checkCommonSeq($commonSectionRan);
		}
		elsif ($fileCatName eq 'prononciation') {
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
		$lastFileSameCat{$fileCatName} = $file;
	}
	else {
		print "Not matched : $file\n";
		<>;
	}
}

closedir($DIR);
exit;

unlink 'wget_log.txt';
for my $lesson(1..$maxLesson) {
	my ($type, $linkExt) = getTypeLesson($lesson);
	INFO "Currently at lesson #".sprintf("%03d", $lesson);
	my %results;
	if ($type == $GRAMMARY) {
		extract_grammary($lesson, $linkExt);
	}
	elsif ($type == $LISTENING) {
		%results = extract_apprentissage($lesson, $linkExt);
		%results = extract_traduction($lesson, $linkExt);
	}
	elsif ($type == $GRAMMARY_AND_ACTIVE) {
		extract_grammary_and_active($lesson, $linkExt);
	}
	elsif ($type == $LISTENING_AND_ACTIVE) {
		extract_listening_and_active($lesson, $linkExt);
	}
	elsif ($type == $ACTIVE) {
		extract_active($lesson, $linkExt);
	}
	else {
		ERROR "No valid type found for lesson #".sprintf("%03d", $lesson);
	}
	print Dumper \%results;
	exit;
	
}

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

sub extract_grammary {
	DEBUG "Processing grammary type";
}

sub extract_traduction {
	DEBUG "Processing traduction page";
	my ($lesson, $linkExt) = @_;
	my @lines = getJavaScriptContents($REF_DIR."exTraduction.asp$linkExt", 1, 2);
	my $text_perl = convertJavascriptToPerl(@lines);
	print $text_perl;
	my (@tabPhrasesText);
	unless (eval ($text_perl)) {
		open my $out, '>', 'DIE_ON_EVAL.txt';
		print $out $text_perl;
		close $out;
		LOGDIE("Problem with eval. See DIE_ON_EVAL.txt for investigations.\n$!");
	}
	shift @tabPhrasesText;
	return ( 'Sentences' => \@tabPhrasesText);
}

sub extract_apprentissage {
	DEBUG "Processing apprentissage page";
	my ($lesson, $linkExt) = @_;
	my @lines = getJavaScriptContents($REF_DIR."apprentissagejs.asp\@l=$lesson");
	my $text_perl = convertJavascriptToPerl(@lines);

	my (@tabPhrasesText, @tabNotes, $commentaire);
	unless (eval ($text_perl )) {
		open my $out, '>', 'DIE_ON_EVAL.txt';
		print $out $text_perl;
		close $out;
		LOGDIE("Problem with eval. See DIE_ON_EVAL.txt for investigations.\n$!");
	}
	shift @tabPhrasesText;
	shift @tabNotes;
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
	DEBUG "Opening ".$filename;
	open my $in, '<', $filename or LOGDIE "Not possible to access $filename in read-only : $!";
	chomp(my @lines = <$in>);
	close $in;
	
	if ($extractJavascript) {
		my $lines = join("\n",@lines);
		@lines = ($lines =~ m/<script type="text\/javascript">(.*?)<\/script>/igs);
		
		return ($lines) unless @results;
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
	
	return ($ACTIVE, $link) if($l >= $phaseActive);
	if ($l >= $phaseMixte) {
		return ($GRAMMARY_AND_ACTIVE, $link) if($l == ($m*7) && $l !=70);
		return ($LISTENING_AND_ACTIVE, $link);
	}
	return ($GRAMMARY, $link) if($l == ($m*7) && $l !=70);
	return ($LISTENING, $link);
}