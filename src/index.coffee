# out: ../lib/index.js
regexes = [/[\s\-_,]/,/[\W]/,/[aieouäöü]/,/[a-z]/,/[AIEOUÄÖÜ]/,/[A-Z0-9]/]
digraphs = ["ch","gh","gn","kn","ph","qu","sh","th","wh","wr"]
diblends= ["bl","br","cl","cr","fl","fr","gl","gr","pl","pr","sc","sl","sm","sn","sp","st"]
trigraphs = ["chr","sch"]
triblends = ["shr","spl","spr","squ","str","thr"]

module.exports = (str,{length, keepSeparators, strict}) ->
  length ?= 3
  keepSeparators ?= false
  strict ?= true
  return "" if length <=0 and strict
  return str if length >= str.length
  #trim
  str = str.replace(/^[\s\-_,]+/, "").replace /[\s\-_,]+$/, ""
  return str if length >= str.length

  chars = str.split ""
  pos = 1
  order = [pos]
  orderedCount = 1
  word = 1
  words = [1]
  sep = 0
  newWord = false
  found
  ## forward search for word beginnings
  i = 1
  while i < chars.length
    order.push 0
    if chars[i].search(regexes[0]) > -1 # seperator found
      words.push 0
      newWord = true
      sep++
    else
      if newWord
        newWord = false
        word++
        pos++
        order[i] = pos
        orderedCount++
        if i < chars.length+2 # search for trigraphs/triblends
          for tri in trigraphs.concat(triblends)
            if tri[0] == chars[i].toLowerCase() and
                tri[1] == chars[i+1].toLowerCase() and
                tri[2] == chars[i+2].toLowerCase()
              found = true
              break
        if found
          found = false
          pos++
          order.push pos
          orderedCount++
          pos++
          order.push pos
          orderedCount++
          words.push word
          words.push word
          i++
          i++
        else if i < chars.length+1 # search for digraphs/diblends
          for di in digraphs.concat(diblends)
            if di[0] == chars[i].toLowerCase() and
                di[1] == chars[i+1].toLowerCase()
              found = true
              break
          if found
            found = false
            pos++
            order.push pos
            orderedCount++
            words.push word
            i++
      words.push word
    i++
  unless strict
    should = word
    if keepSeparators
      should += sep
    if length < should
      length = should
  ## backward search for seperators

  if keepSeparators
    i = 0
    while i < chars.length
      if words[i] == 0
        order[i] = pos
        orderedCount++
        pos++
      i++
    pos = chars.length
  else
    pos = chars.length
    i = chars.length
    while i > 0
      i--
      if words[i] == 0
        order[i] = pos
        orderedCount++
        pos--
  ## backward search for remaining chars
  j = 1
  unfinished = true
  while j < regexes.length and unfinished
    i = chars.length
    while i > 0
      i--
      unless order[i] > 0
        if chars[i].search(regexes[j]) > -1
          order[i] = pos
          orderedCount++
          pos--
          if orderedCount == chars.length
            unfinished = false
            break
    j++
  # map selected chars
  chars = chars.map (val,i) ->
    if order[i] <= length
      return val
    else
      return ""
  return chars.join("")
