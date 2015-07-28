(function() {
  var diblends, digraphs, regexes, triblends, trigraphs;

  regexes = [/[\s\-_,]/, /[\W]/, /[aieouäöü]/, /[a-z]/, /[AIEOUÄÖÜ]/, /[A-Z0-9]/];

  digraphs = ["ch", "gh", "gn", "kn", "ph", "qu", "sh", "th", "wh", "wr"];

  diblends = ["bl", "br", "cl", "cr", "fl", "fr", "gl", "gr", "pl", "pr", "sc", "sl", "sm", "sn", "sp", "st"];

  trigraphs = ["chr", "sch"];

  triblends = ["shr", "spl", "spr", "squ", "str", "thr"];

  module.exports = function(str, arg) {
    var chars, di, found, i, j, k, keepSeparators, l, len, len1, length, newWord, order, orderedCount, pos, ref, ref1, sep, should, strict, tri, unfinished, word, words;
    length = arg.length, keepSeparators = arg.keepSeparators, strict = arg.strict;
    if (length == null) {
      length = 3;
    }
    if (keepSeparators == null) {
      keepSeparators = false;
    }
    if (strict == null) {
      strict = true;
    }
    if (length <= 0 && strict) {
      return "";
    }
    if (length >= str.length) {
      return str;
    }
    str = str.replace(/^[\s\-_,]+/, "").replace(/[\s\-_,]+$/, "");
    if (length >= str.length) {
      return str;
    }
    chars = str.split("");
    pos = 1;
    order = [pos];
    orderedCount = 1;
    word = 1;
    words = [1];
    sep = 0;
    newWord = false;
    found;
    i = 1;
    while (i < chars.length) {
      order.push(0);
      if (chars[i].search(regexes[0]) > -1) {
        words.push(0);
        newWord = true;
        sep++;
      } else {
        if (newWord) {
          newWord = false;
          word++;
          pos++;
          order[i] = pos;
          orderedCount++;
          if (i < chars.length + 2) {
            ref = trigraphs.concat(triblends);
            for (k = 0, len = ref.length; k < len; k++) {
              tri = ref[k];
              if (tri[0] === chars[i].toLowerCase() && tri[1] === chars[i + 1].toLowerCase() && tri[2] === chars[i + 2].toLowerCase()) {
                found = true;
                break;
              }
            }
          }
          if (found) {
            found = false;
            pos++;
            order.push(pos);
            orderedCount++;
            pos++;
            order.push(pos);
            orderedCount++;
            words.push(word);
            words.push(word);
            i++;
            i++;
          } else if (i < chars.length + 1) {
            ref1 = digraphs.concat(diblends);
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              di = ref1[l];
              if (di[0] === chars[i].toLowerCase() && di[1] === chars[i + 1].toLowerCase()) {
                found = true;
                break;
              }
            }
            if (found) {
              found = false;
              pos++;
              order.push(pos);
              orderedCount++;
              words.push(word);
              i++;
            }
          }
        }
        words.push(word);
      }
      i++;
    }
    if (!strict) {
      should = word;
      if (keepSeparators) {
        should += sep;
      }
      if (length < should) {
        length = should;
      }
    }
    if (keepSeparators) {
      i = 0;
      while (i < chars.length) {
        if (words[i] === 0) {
          order[i] = pos;
          orderedCount++;
          pos++;
        }
        i++;
      }
      pos = chars.length;
    } else {
      pos = chars.length;
      i = chars.length;
      while (i > 0) {
        i--;
        if (words[i] === 0) {
          order[i] = pos;
          orderedCount++;
          pos--;
        }
      }
    }
    j = 1;
    unfinished = true;
    while (j < regexes.length && unfinished) {
      i = chars.length;
      while (i > 0) {
        i--;
        if (!(order[i] > 0)) {
          if (chars[i].search(regexes[j]) > -1) {
            order[i] = pos;
            orderedCount++;
            pos--;
            if (orderedCount === chars.length) {
              unfinished = false;
              break;
            }
          }
        }
      }
      j++;
    }
    chars = chars.map(function(val, i) {
      if (order[i] <= length) {
        return val;
      } else {
        return "";
      }
    });
    return chars.join("");
  };

}).call(this);
