(function () {
	// These are the characters that are being folded.
	var charMap = { 'á':'a', 'é':'e', 'í':'i','ó':'o','ú':'u', 'ü':'u', 'ñ':'n' };
	var foldChars = function (s) {
		var i = 0;
		if (!s) { return ''; }
		var ret = '';
		for (i = 0; i < s.length; i++) {
			ret += charMap[s.charAt(i)] || s.charAt(i);
		}
		return ret;
	};
	var showAccepted = function (accepted, suggested) {
		var i,il = 0;
		var s = "";
		// Reset styles
		for	(i = 0, il = suggested.length; i < il; ++i) {
			suggested[i].style.color = "#444";
			suggested[i].style.fontWeight = "300";
		}
		for	(i = 0, il = suggested.length; i < il; ++i) {
			s = foldChars(suggested[i].innerHTML.toLowerCase());
			for	(var j = 0, jl = accepted.length; j < jl; ++j) {
				if ( s === accepted[j] ) {
					suggested[i].style.color = "#91c22c";
					suggested[i].style.fontWeight = "700";
				}
			}
		}
	};
	var removeNoise = function (s) {
		// Removes: "&nbsp;", multiple spaces, space at the begining/end of sentence, period at the end of the sentence.
		s = s.replace("&nbsp;"," ");
		s = s.replace(/\s{2,}/," ");
		s = s.replace(/\s{2,}/," ");
		s = s.replace(/^\s{1,}/,"");
		s = s.replace(/\s{1,}$/,"");
		s = s.replace(/\.$/,"");
		return s;
	};
	var i,j,g,il,jl,gl = 0;
	var accepted_raw = [];
	var accepted = [];
	var sentence = "";
	var sentence_raw = "";
	var option_blocks = [];
	var options_per_block_text = [];
	var options_per_block = [];
	var options = 0;
	var suggested_raw = [];
	var groups = ['forward', 'reverse'];
	for (g = 0, gl = groups.length; g < gl; ++g) {
		accepted = [];
		suggested_raw = [];
		accepted_raw = document.getElementById(groups[g]).getElementsByClassName('translation-input');
		suggested_raw = document.getElementById(groups[g]).getElementsByClassName('report-suggestion');
		for (i = 0, il = accepted_raw.length; i < il; ++i) {
			if ( g === 0 ) {
				sentence_raw = accepted_raw[i].value;
			} else {
				sentence_raw = accepted_raw[i].innerHTML;
			}
			if (sentence_raw.length > 0) {
				sentence = sentence_raw.replace(/<span class="syntax">/gi,"");
				sentence = sentence.replace(/<\/span>/gi,"");
				option_blocks = ( sentence.match(/\[[^\]]*\]/g) || [] );
				if (option_blocks.length === 0) {
					// If sentence does not have options
					sentence = removeNoise(sentence);
					accepted.push(foldChars(sentence.toLowerCase()));
				} else {
					// If sentence has options
					options_per_block = [];
					options = 0;
					options_per_block_text = [];
					var options_per_block_done = [];
					// Get the options for each of the blocks into array
					for (j = 0, jl = option_blocks.length; j < jl; j++) {
						options = option_blocks[j].split('/').length;
						var block = option_blocks[j].substr(1,(option_blocks[j].length-2));
						options_per_block_text.push(block.split('/'));
						options_per_block.push(options);
						options_per_block_done.push(0);
					}
					// Setup variables for while loop
					var options_per_block_total = options_per_block[0];
					var options_done_total = 0;
					for (j = 1, jl = options_per_block.length; j < jl; j++) {
						options_per_block_total = options_per_block_total * options_per_block[j];
					}
					var accepted_sentence = "";
					var done = false;
					// Produce all accepted sentences and store them into array
					while(!done) {
						accepted_sentence = sentence;
						// Replace each block with corresponding permutation
						for (j = 0, jl = options_per_block.length; j < jl; j++) {
							accepted_sentence = accepted_sentence.replace(/\[[^\]]*\]/,options_per_block_text[j][options_per_block_done[j]]);
						}
						accepted_sentence = removeNoise(accepted_sentence);
						accepted.push(foldChars(accepted_sentence.toLowerCase()));
						// Adjust array with next permutation to pull.
						for (j = 0, jl = options_per_block.length; j < jl; j++) {
							if (options_per_block_done[j] < (options_per_block[j] - 1)) {
								options_per_block_done[j]++;
								break;
							} else if (options_per_block_done[j] === (options_per_block[j] - 1)) {
								options_per_block_done[j] = 0;
							}
						}
						options_done_total++;
						// done = ( options_per_block_total === options_done_total );
						if ( options_per_block_total === options_done_total ) {
							done = true;
						}
					} // End while
				} // End if
			} // End if
		} // End for
		if (accepted !== [] ) {
			showAccepted(accepted, suggested_raw);
		}
	} // End for
}());
