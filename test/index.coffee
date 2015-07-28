chai = require "chai"
should = chai.should()
abbreviate = require "../src"

str1 = "test"
str2 = "TesT"
str3 = "Word1 2Drow"
str4 = "Word1-2Drow_Word3"
str5 = "Word1 _-2Drow"
str6 = "so write score"
str7 = "total splash"
describe "abbreviate", ->
  it "should return the string on length>string.length", ->
    abbreviate(str1, length: str1.length).should.equal str1
    abbreviate(str1, length: str1.length+1).should.equal str1
  it "should remove vokals first", ->
    abbreviate(str1, length: str1.length-1).should.equal "tst"
  it "should begin in the end", ->
    abbreviate(str1, length: str1.length-2).should.equal "ts"
  it "should remove lowercase first", ->
    abbreviate(str2, length: str2.length-2).should.equal "TT"
  describe "with words", ->
    it "should remove whitespace first", ->
      abbreviate(str3, length: str3.length-1).should.equal "Word12Drow"
    it "should remove vokals", ->
      abbreviate(str3, length: str3.length-2).should.equal "Word12Drw"
      abbreviate(str3, length: str3.length-3).should.equal "Wrd12Drw"
    it "should remove lowercase", ->
      abbreviate(str3, length: str3.length-4).should.equal "Wrd12Dr"
      abbreviate(str3, length: str3.length-5).should.equal "Wrd12D"
      abbreviate(str3, length: str3.length-6).should.equal "Wr12D"
      abbreviate(str3, length: str3.length-7).should.equal "W12D"
    it "should remove Uppercase/Numbers within a word", ->
      abbreviate(str3, length: str3.length-8).should.equal "W12"
      abbreviate(str3, length: str3.length-9).should.equal "W2"
    it "should remove Uppercase/Numbers at word beginning", ->
      abbreviate(str3, length: str3.length-10).should.equal "W"
      abbreviate(str3, length: str3.length-11).should.equal ""
    it "should remove _ and -", ->
      abbreviate(str4, length: str4.length-1).should.equal "Word1-2DrowWord3"
      abbreviate(str4, length: str4.length-2).should.equal "Word12DrowWord3"
    it "should find more difficult words", ->
      abbreviate(str5, length: str5.length-3).should.equal "Word12Drow"
    it "should respect digraphs and diblends", ->
      abbreviate(str6, length: 5).should.equal "swrsc"
    it "should respect trigraphs and triblends", ->
      abbreviate(str7, length: 4).should.equal "tspl"
    it "should respect trigraphs and triblends", ->
      abbreviate("Some Important String", length: 8).should.equal "SmImpStr"
  describe "with keepSeparators", ->
    it "should keepSeparators", ->
      abbreviate(str5, length: 5, keepSeparators:true).should.equal "W _-2"
  describe "with strict", ->
    it "should overwrite length", ->
      abbreviate(str5, length: 1, strict:false).should.equal "W2"
      abbreviate(str5, length: 1, strict:false, keepSeparators:true).should.equal "W _-2"
