(function() {
  var diblends, digraphs, regexes, triblends, trigraphs;

  regexes = [/[\s\-_,]/, /[\W]/, /[aeouäöü]/, /[a-z]/, /[AEOUÄÖÜ]/, /[A-Z0-9]/];

  digraphs = ["ch", "gh", "gn", "kn", "ph", "qu", "sh", "th", "wh", "wr"];

  diblends = ["bl", "br", "cl", "cr", "fl", "fr", "gl", "gr", "pl", "pr", "sc", "sl", "sm", "sn", "sp", "st"];

  trigraphs = ["chr", "sch"];

  triblends = ["shr", "spl", "spr", "squ", "str", "thr"];

  module.exports = function(str, length) {
    var chars, di, found, i, j, k, l, len, len1, newWord, order, orderedCount, pos, ref, ref1, tri, unfinished, word, words;
    if (length == null) {
      length = 3;
    }
    if (length <= 0) {
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
    newWord = false;
    found;
    i = 1;
    while (i < chars.length) {
      order.push(0);
      if (chars[i].search(regexes[0]) > -1) {
        words.push(0);
        newWord = true;
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
    console.log(chars);
    chars = chars.map(function(val, i) {
      if (order[i] <= length) {
        return val;
      } else {
        return "";
      }
    });
    console.log(order);
    return chars.join("");
  };

}).call(this);
