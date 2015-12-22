# Cavalier

Exposes your your favorite selenium webdriver through a "page object"*-esque* interface / DSL.

## Install

```
npm i -S cavalier
```

## Usage

Please see ```examples/cucumber```

---
# API Reference (TBC)

## Classes

<dl>
<dt><a href="#Element">Element</a></dt>
<dd><p>represents a single Element</p>
</dd>
<dt><a href="#Elements">Elements</a></dt>
<dd><p>represents a collection of Elements</p>
</dd>
<dt><a href="#Interface">Interface</a></dt>
<dd><p>represents a whole or sub interface of &quot;elements :?&quot;</p>
</dd>
</dl>

<a name="Element"></a>
## Element
represents a single Element

**Kind**: global class  

* [Element](#Element)
    * [new Element(selector, [adapter], [index])](#new_Element_new)
    * [.selector](#Element+selector) ⇒ <code>string</code>
    * [.index](#Element+index) ⇒ <code>number</code>

<a name="new_Element_new"></a>
### new Element(selector, [adapter], [index])

| Param | Type |
| --- | --- |
| selector | <code>string</code> | 
| [adapter] | <code>Object</code> | 
| [index] | <code>number</code> | 

<a name="Element+selector"></a>
### element.selector ⇒ <code>string</code>
**Kind**: instance property of <code>[Element](#Element)</code>  
<a name="Element+index"></a>
### element.index ⇒ <code>number</code>
**Kind**: instance property of <code>[Element](#Element)</code>  
<a name="Elements"></a>
## Elements
represents a collection of Elements

**Kind**: global class  

* [Elements](#Elements)
    * [.length](#Elements+length) ⇒ <code>Promise.&lt;int&gt;</code>
    * [.first](#Elements+first) ⇒ <code>[Element](#Element)</code>
    * [.last](#Elements+last) ⇒ <code>[Element](#Element)</code>
    * [.at()](#Elements+at) ⇒ <code>[Element](#Element)</code>

<a name="Elements+length"></a>
### elements.length ⇒ <code>Promise.&lt;int&gt;</code>
promises to return the length of elements in the collection

**Kind**: instance property of <code>[Elements](#Elements)</code>  
<a name="Elements+first"></a>
### elements.first ⇒ <code>[Element](#Element)</code>
returns an object that represents the first element in collection

**Kind**: instance property of <code>[Elements](#Elements)</code>  
<a name="Elements+last"></a>
### elements.last ⇒ <code>[Element](#Element)</code>
returns an object that represents the last element in the collection

**Kind**: instance property of <code>[Elements](#Elements)</code>  
<a name="Elements+at"></a>
### elements.at() ⇒ <code>[Element](#Element)</code>
returns an object that represents the nth element in collection

**Kind**: instance method of <code>[Elements](#Elements)</code>  
<a name="Interface"></a>
## Interface
represents a whole or sub interface of "elements :?"

**Kind**: global class  

* [Interface](#Interface)
    * [new Interface(adapter)](#new_Interface_new)
    * [.adapter](#Interface+adapter) ⇒ <code>Object</code>
    * [.element(name, selector)](#Interface+element) ⇒ <code>[Element](#Element)</code>
    * [.elements(name, selector)](#Interface+elements) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
    * [.section(SubInterface, name, selector)](#Interface+section) ⇒ <code>[Interface](#Interface)</code>

<a name="new_Interface_new"></a>
### new Interface(adapter)

| Param | Type |
| --- | --- |
| adapter | <code>Object</code> | 

<a name="Interface+adapter"></a>
### interface.adapter ⇒ <code>Object</code>
**Kind**: instance property of <code>[Interface](#Interface)</code>  
<a name="Interface+element"></a>
### interface.element(name, selector) ⇒ <code>[Element](#Element)</code>
**Kind**: instance method of <code>[Interface](#Interface)</code>  

| Param | Type |
| --- | --- |
| name | <code>sting</code> | 
| selector | <code>sting</code> | 

<a name="Interface+elements"></a>
### interface.elements(name, selector) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
**Kind**: instance method of <code>[Interface](#Interface)</code>  

| Param | Type |
| --- | --- |
| name | <code>sting</code> | 
| selector | <code>sting</code> | 

<a name="Interface+section"></a>
### interface.section(SubInterface, name, selector) ⇒ <code>[Interface](#Interface)</code>
**Kind**: instance method of <code>[Interface](#Interface)</code>  

| Param | Type |
| --- | --- |
| SubInterface | <code>[Interface](#Interface)</code> | 
| name | <code>sting</code> | 
| selector | <code>sting</code> | 


## Custom Adapter interface

The following methods are required for a creating custom adapters:

```
contextulise - Interface dependency - clone an adapter with custom root selector
findAll - Elements dependency - find a collection of elements given a selector
methods - Element dependency - return list of methods that can be exposed for a single element
```

See ```lib/adapter/webdriverio.js```.

---

# Road Map

## v0.0.1

- [x] proof of concept
- [ ] used for a production ready system #proofOfUsefulness
- [ ] complete documentation and examples
- [ ] implement selenium driver based adapter (webdriverio, selenium-webdriver)
- [ ] implement non-selenium driver adapter (phantomjs, zombiejs)
- [ ] update documentation and examples

## Thoughts

* Could this be used to write run browser driven tests, from within a browser? (e.g. using a insecure iframe ;)
* Better error handling?
* Performance?

---

# LICENSE

The MIT License (MIT)

Copyright (c) 2015 Mudi Renegare

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
Generated: Tue 22 Dec 2015 17:29:03 GMT
