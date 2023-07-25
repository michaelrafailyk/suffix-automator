document.addEventListener('DOMContentLoaded', function() {

	let automator = {
		elem: {
			// elements
			characters: document.getElementById('characters'),
			feature: document.getElementById('feature'),
			header: document.getElementById('feature-header'),
			suffix: document.getElementById('suffix'),
			direction: document.getElementById('direction'),
			reverse: document.getElementById('feature-reverse'),
			sort: document.getElementById('feature-sort'),
			classes: document.getElementById('feature-class'),
			capital: document.getElementById('feature-capital'),
			lowercase: document.getElementById('feature-lowercase'),
			copy: document.getElementById('copy')
		},
		init: function() {
			automator.suffix.original = automator.elem.suffix.textContent;
			automator.suffix.actual = automator.elem.suffix.textContent;
			automator.suffix.last = automator.elem.suffix.textContent;
			automator.elem.suffix.addEventListener('focus', automator.suffix.save);
			automator.elem.suffix.addEventListener('keydown', automator.suffix.type);
			automator.elem.suffix.addEventListener('input', automator.suffix.update);
			automator.elem.suffix.addEventListener('blur', automator.suffix.blur);
			automator.elem.characters.addEventListener('input', automator.type);
			automator.elem.reverse.addEventListener('click', automator.reverse);
			automator.elem.sort.addEventListener('click', automator.sort);
			automator.elem.classes.addEventListener('click', automator.classes);
			automator.elem.capital.addEventListener('click', automator.capital);
			automator.elem.lowercase.addEventListener('click', automator.lowercase);
			automator.elem.copy.addEventListener('click', automator.copy);
		},
		suffix: {
			direction: 'to',
			original: null,
			actual: null,
			last: null,
			save: function() {
				automator.suffix.original = automator.elem.suffix.textContent;
			},
			type: function(e) {
				let key = e.key;
				let pattern = /[a-zA-Z0-9\.\-_]/;
				// exit by pressing Enter or Escape key
				if (key === 'Enter' || key === 'Escape') {
					automator.elem.suffix.blur();
					e.preventDefault();
					return false;
				// allow to type base latin characters with a dot and underscore in the suffix field
				} else if (!key.match(pattern)) {
					e.preventDefault();
					return false;
				}
			},
			update: function() {
				// preserve last suffix for replacement action
				if (automator.elem.suffix.textContent.length) {
					automator.suffix.last = automator.suffix.actual;
					automator.suffix.actual = automator.elem.suffix.textContent;
					if (automator.action.reverse) {
						automator.reverse_suffix();
					}
					automator.type();
				}
			},
			blur: function() {
				if (automator.elem.suffix.textContent.length) {
					automator.suffix.last = automator.suffix.actual;
					automator.suffix.actual = automator.elem.suffix.textContent;
				} else {
					automator.elem.suffix.textContent = automator.suffix.original;
					automator.suffix.last = automator.suffix.actual;
					automator.suffix.actual = automator.suffix.original;
				}
				if (automator.action.reverse) {
					automator.reverse_suffix();
				}
				automator.type();
			}
		},
		type: function() {
			// show or hide action buttons
			// generate feature
			if (automator.elem.characters.value && automator.elem.characters.value !== ' ') {
				if (!automator.elem.reverse.classList.contains('action-ready')) {
					automator.elem.header.classList.add('header-ready');
					automator.elem.reverse.classList.add('action-ready');
					automator.elem.sort.classList.add('action-ready');
					automator.elem.classes.classList.add('action-ready');
					automator.elem.capital.classList.add('action-ready');
					automator.elem.lowercase.classList.add('action-ready');
					automator.elem.copy.classList.add('action-ready');
				}
				// turn on/off reverse if first and last characters have or doesn't have suffix
				let list = automator.unboxing();
				let first_char_suffix = list[0].match('.' + automator.suffix.actual);
				let first_char_end = list[0][list[0].length-1];
				let suffix_end = automator.suffix.actual[automator.suffix.actual.length-1];
				if (first_char_suffix && first_char_end === suffix_end && !automator.action.reverse) {
					automator.elem.reverse.classList.add('action-active');
					automator.elem.direction.textContent = 'from';
					automator.action.reverse = true;
				} else if (!first_char_suffix && automator.action.reverse) {
					automator.elem.reverse.classList.remove('action-active');
					automator.elem.direction.textContent = 'to';
					automator.action.reverse = false;
				}
				automator.generate();
			} else {
				automator.elem.header.classList.remove('header-ready');
				automator.elem.sort.classList.remove('action-ready', 'action-active');
				automator.elem.classes.classList.remove('action-ready');
				automator.elem.reverse.classList.remove('action-ready', 'action-active');
				automator.elem.capital.classList.remove('action-ready', 'action-active');
				automator.elem.lowercase.classList.remove('action-ready', 'action-active');
				automator.elem.copy.classList.remove('action-ready');
				automator.elem.direction.textContent = 'to';
				automator.elem.feature.textContent = '';
				automator.action.classes = false;
				automator.action.reverse = false;
				automator.action.capital = false;
				automator.action.lowercase = false;
			}
			automator.autoheight();
		},
		// update the height of textarea
		autoheight: function() {
			automator.elem.characters.style.height = 200 + 'px';
			automator.elem.characters.style.height = automator.elem.characters.scrollHeight + 'px';
		},
		// markers for active actions
		action: {
			classes: false,
			reverse: false,
			capital: false,
			lowercase: false
		},
		// read list of characters to array
		unboxing: function() {
			let list = automator.elem.characters.value.trim().replace(/\r\n|\s+/g, '\n').split('\n');
			// remove duplicates
			return [...new Set(list)];
		},
		// sort list of characters alphabetically but logically grouped
		sort: function() {
			let list = automator.unboxing();
			list.sort();
			let alphabet = [];
			let number = [];
			let other = [];
			// detect the names of numbers
			let ifnumber = function(i) {
				if (i.indexOf('zero') >= 0 && i[0] == 'z' && i[1] == 'e') { return true; }
				else if (i.indexOf('one') >= 0 && i[0] == 'o' && i[1] == 'n') { return true; }
				else if (i.indexOf('two') >= 0 && i[0] == 't' && i[1] == 'w') { return true; }
				else if (i.indexOf('three') >= 0 && i[0] == 't' && i[1] == 'h') { return true; }
				else if (i.indexOf('four') >= 0 && i[0] == 'f' && i[1] == 'o') { return true; }
				else if (i.indexOf('five') >= 0 && i[0] == 'f' && i[1] == 'i') { return true; }
				else if (i.indexOf('six') >= 0 && i[0] == 's' && i[1] == 'i') { return true; }
				else if (i.indexOf('seven') >= 0 && i[0] == 's' && i[1] == 'e') { return true; }
				else if (i.indexOf('eight') >= 0 && i[0] == 'e' && i[1] == 'i') { return true; }
				else if (i.indexOf('nine') >= 0 && i[0] == 'n' && i[1] == 'i') { return true; }
				return false;
			}
			// split list to base alphabet, numbers, and other characters
			for (let i=0; i<list.length; i++) {
				if (list[i].length == 1 || list[i][1] == '.') {
					alphabet.push(list[i]);
				} else if (ifnumber(list[i])) {
					number.push(list[i]);
				} else {
					other.push(list[i])
				}
			}
			let number_base = [];
			let number_suffix = [];
			// sort numbers logically from zero to nine
			// split base numbers and numbers with a suffix
			if (number.length > 1) {
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'zero') number_base.push(number[i]);
					if (number[i].match('zero.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'one') number_base.push(number[i]);
					if (number[i].match('one.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'two') number_base.push(number[i]);
					if (number[i].match('two.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'three') number_base.push(number[i]);
					if (number[i].match('three.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'four') number_base.push(number[i]);
					if (number[i].match('four.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'five') number_base.push(number[i]);
					if (number[i].match('five.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'six') number_base.push(number[i]);
					if (number[i].match('six.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'seven') number_base.push(number[i]);
					if (number[i].match('seven.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'eight') number_base.push(number[i]);
					if (number[i].match('eight.')) number_suffix.push(number[i]);
				}
				for (let i=0; i<number.length; i++) {
					if (number[i] == 'nine') number_base.push(number[i]);
					if (number[i].match('nine.')) number_suffix.push(number[i]);
				}
				number = number_base;
			}
			// merge all sets to one list
			list = alphabet.concat(number, number_suffix, other);
			// write sorted characters to the characters field and update feature
			automator.elem.characters.value = list.join('\n');
			automator.autoheight();
			automator.generate();
		},
		// wrap feature substitutions into two classes
		classes: function() {
			automator.elem.classes.classList.toggle('action-active');
			if (!automator.action.classes) {
				automator.action.classes = true;
			} else {
				automator.action.classes = false;
			}
			automator.generate();
		},
		// reverse direction of substitution
		reverse: function() {
			automator.elem.reverse.classList.toggle('action-active');
			if (!automator.action.reverse) {
				automator.elem.direction.textContent = 'from';
				automator.action.reverse = true;
			} else {
				automator.elem.direction.textContent = 'to';
				automator.action.reverse = false;
			}
			let list = automator.unboxing();
			let array = [];
			for (let i=0; i<list.length; i++) {
				let character = list[i];
				let line = '';
				if (character.length) {
					// remove last match suffix
					let char_end = character[character.length-1];
					let suffix_end = automator.suffix.actual[automator.suffix.actual.length-1];
					if (character.indexOf('.' + automator.suffix.actual) >= 0 && char_end === suffix_end) {
						let i = character.lastIndexOf('.' + automator.suffix.actual);
						character = character.slice(0, i);
					}
					if (!automator.action.reverse) {
						line = character;
					} else {
						// add the suffix if reversed
						line = character + '.' + automator.suffix.actual;
					}
				}
				array.push(line);
			}
			// update characters and feature fields
			automator.elem.characters.value = array.join('\n');
			automator.autoheight();
			automator.generate();
		},
		// set the suffix when reverse is active
		reverse_suffix: function() {
			if (automator.elem.characters.value && automator.elem.characters.value !== ' ') {
				let list = automator.unboxing();
				let array = [];
				for (let i=0; i<list.length; i++) {
					let character = list[i];
					if (character.length) {
						// remove last match suffix
						let char_end = character[character.length-1];
						let suffix_end = automator.suffix.last[automator.suffix.last.length-1];
						if (character.indexOf('.' + automator.suffix.last) >= 0 && char_end === suffix_end) {
							let i = character.lastIndexOf('.' + automator.suffix.last);
							character = character.slice(0, i);
						}
						// add an actual suffix
						character += '.' + automator.suffix.actual;
					}
					array.push(character);
				}
				// update characters field
				automator.elem.characters.value = array.join('\n');
			}
		},
		// capitalize substituted characters with first capital letter
		capital: function() {
			automator.elem.capital.classList.toggle('action-active');
			if (!automator.action.capital) {
				automator.action.capital = true;
			} else {
				automator.action.capital = false;
			}
			if (automator.action.lowercase) {
				automator.action.lowercase = false;
				automator.elem.lowercase.classList.remove('action-active');
			}
			automator.generate();
		},
		// decapitalize substituted characters with first lowercase letter
		lowercase: function() {
			automator.elem.lowercase.classList.toggle('action-active');
			if (!automator.action.lowercase) {
				automator.action.lowercase = true;
			} else {
				automator.action.lowercase = false;
			}
			if (automator.action.capital) {
				automator.action.capital = false;
				automator.elem.capital.classList.remove('action-active');
			}
			automator.generate();
		},
		// generate feature
		generate: function() {
			let list = automator.unboxing();
			let print = '';
			// feature version without classes (multiline substitution)
			if (!automator.action.classes) {
				for (let i=0; i<list.length; i++) {
					let line = '';
					let character = list[i];
					if (character.length) {
						let last_char = character.substring(character.length - 1, character.length);
						// remove the dot at the end of character name
						if (last_char == '.') {
							character = character.substring(0, character.length - 1);
						}
						let converted;
						// for character with a suffix
						let char_end = character[character.length-1];
						let suffix_end = automator.suffix.actual[automator.suffix.actual.length-1];
						let uni = character.substring(0,3) == 'uni';
						let firstTwo = character.substring(0,2);
						let doubleLowercase = (firstTwo == 'ae' || firstTwo == 'oe' || firstTwo == 'ij' || firstTwo == 'nj');
						let doubleUppercase = (firstTwo == 'AE' || firstTwo == 'OE' || firstTwo == 'IJ' || firstTwo == 'NJ');
						if (character.indexOf('.' + automator.suffix.actual) >= 0 && char_end === suffix_end) {
							let i = character.lastIndexOf('.' + automator.suffix.actual);
							converted = character.slice(0, i);
							character = converted + '<div class="feature-color-suffix">.' + automator.suffix.actual + '</div>';
							if (converted.length) {
								// capitalize or decapitalize
								if (automator.action.capital && !uni) {
									if (doubleLowercase) {
										converted = converted.substring(0,2).toUpperCase() + converted.slice(2);
									} else {
										converted = converted.charAt(0).toUpperCase() + converted.slice(1);
									}
								} else if (automator.action.lowercase && !uni) {
									if (doubleUppercase) {
										converted = converted.substring(0,2).toLowerCase() + converted.slice(2);
									} else {
										converted = converted.charAt(0).toLowerCase() + converted.slice(1);
									}
								}
								// line of substitution
								if (!automator.action.reverse) {
									line = '  sub ' + converted + ' by ' + character + ';';
								} else {
									line = '  sub ' + character + ' by ' + converted + ';';
								}
							}
						// for character without a suffix
						} else {
							converted = character + '<div class="feature-color-suffix">.' + automator.suffix.actual + '</div>';
							// capitalize or decapitalize
							if (automator.action.capital && !uni) {
								if (doubleLowercase) {
									converted = converted.substring(0,2).toUpperCase() + converted.slice(2);
								} else {
									converted = converted.charAt(0).toUpperCase() + converted.slice(1);
								}
							} else if (automator.action.lowercase && !uni) {
								if (doubleUppercase) {
									converted = converted.substring(0,2).toLowerCase() + converted.slice(2);
								} else {
									converted = converted.charAt(0).toLowerCase() + converted.slice(1);
								}
							}
							// line of substitution
							if (!automator.action.reverse) {
								line = '  sub ' + character + ' by ' + converted + ';';
							} else {
								line = '  sub ' + converted + ' by ' + character + ';';
							}
						}
					}
					// prepare for html syntax highlight
					if (line.length) {
						line = line.replace('  ', '&nbsp;&nbsp;');
						line = line.replace('sub', '<div class="feature-color">sub</div>').replace('by', '<div class="feature-color">by</div>');
						// add the line to a feature code
						print += line;
						if (i < list.length-1) {
							print += '<br>';
						}
					}
				}
			// feature version with a classes wrapping
			} else {
				let class1 = '';
				let class2 = '';
				for (let i=0; i<list.length; i++) {
					let character = list[i];
					// remove last match suffix
					let char_end = character[character.length-1];
					let suffix_end = automator.suffix.actual[automator.suffix.actual.length-1];
					if (character.indexOf('.' + automator.suffix.actual) >= 0 && char_end === suffix_end) {
						let i = character.lastIndexOf('.' + automator.suffix.actual);
						character = character.slice(0, i);
					}
					if (character.length) {
						// add the suffix to converted version
						let converted = character + '<div class="feature-color-suffix">.' + automator.suffix.actual + '</div>';
						if (automator.action.reverse) {
							let character_temp = character;
							character = converted;
							converted = character_temp;
						}
						// capitalize or decapitalize
						if (automator.action.capital) {
							converted = converted.charAt(0).toUpperCase() + converted.slice(1);
						} else if (automator.action.lowercase) {
							converted = converted.charAt(0).toLowerCase() + converted.slice(1);
						}
						class1 += character;
						class2 += converted;
						if (i < list.length-1) {
							class1 += ' ';
							class2 += ' ';
						}
					}
				}
				// classes names
				let name1 = 'characters';
				let name2 = automator.suffix.actual;
				if (automator.action.reverse) {
					let name_temp = name1;
					name1 = name2;
					name2 = name_temp;
				}
				// prepare for html syntax highlight
				let line1 = '&nbsp;&nbsp;@' + name1 + ' = [' + class1 + '];';
				let line2 = '&nbsp;&nbsp;@' + name2 + ' = [' + class2 + '];';
				let line3 = '&nbsp;&nbsp;<div class="feature-color">sub</div> @' + name1 + ' <div class="feature-color">by</div> @' + name2 + ';';
				// merge the result to a feature code
				print = line1 + '<br>' + line2 + '<br><br>' + line3;
			}
			// update the feature field
			automator.elem.feature.innerHTML = print;
		},
		// copy feature code to the clipboard
		copy: function() {
			let selection = window.getSelection();
			selection.removeAllRanges();
			let data = automator.elem.feature.innerText;
			navigator.clipboard.writeText(data);
			// show and hide the "copied" label
			if (!automator.elem.feature.classList.contains('feature-copied-ready')) {
				automator.elem.feature.classList.add('feature-copied-ready');
				setTimeout(function() {
					automator.elem.feature.classList.add('feature-copied');
					setTimeout(function() {
						automator.elem.feature.classList.remove('feature-copied');
						setTimeout(function() {
							automator.elem.feature.classList.remove('feature-copied-ready');
						}, 250);
					}, 1500);
				}, 40);
			}
		}
	};

	automator.init();

});