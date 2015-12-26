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
<dt><a href="#Interfaces">Interfaces</a></dt>
<dd><p>represents a collection of Interfaces</p>
</dd>
</dl>

<a name="Element"></a>
## Element
represents a single Element

**Kind**: global class  

* [Element](#Element)
    * [new Element([selector], [adapter], [index])](#new_Element_new)
    * [.selector](#Element+selector) ⇒ <code>string</code>
    * [.index](#Element+index) ⇒ <code>number</code>

<a name="new_Element_new"></a>
### new Element([selector], [adapter], [index])

| Param | Type | Default |
| --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | 
| [adapter] | <code>Object</code> |  | 
| [index] | <code>number</code> | <code>0</code> | 

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
    * [.at(nth)](#Elements+at) ⇒ <code>[Element](#Element)</code>

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
### elements.at(nth) ⇒ <code>[Element](#Element)</code>
returns an object that represents the nth element in collection

**Kind**: instance method of <code>[Elements](#Elements)</code>  

| Param | Type |
| --- | --- |
| nth | <code>number</code> | 

<a name="Interface"></a>
## Interface
represents a whole or sub interface of "elements :?"

**Kind**: global class  

* [Interface](#Interface)
    * [new Interface(adapter, [index])](#new_Interface_new)
    * [.index](#Interface+index) ⇒ <code>int</code>
    * [.adapter](#Interface+adapter) ⇒ <code>Object</code>
    * [.element(name, selector)](#Interface+element) ⇒ <code>[Element](#Element)</code>
    * [.elements(name, selector)](#Interface+elements) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
    * [.section(SubInterface, name, selector)](#Interface+section) ⇒ <code>[Interface](#Interface)</code>
    * [.sections(SubInterface, name, selector)](#Interface+sections) ⇒ <code>[Interfaces](#Interfaces)</code>

<a name="new_Interface_new"></a>
### new Interface(adapter, [index])

| Param | Type | Default |
| --- | --- | --- |
| adapter | <code>Object</code> |  | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="Interface+index"></a>
### interface.index ⇒ <code>int</code>
**Kind**: instance property of <code>[Interface](#Interface)</code>  
<a name="Interface+adapter"></a>
### interface.adapter ⇒ <code>Object</code>
**Kind**: instance property of <code>[Interface](#Interface)</code>  
<a name="Interface+element"></a>
### interface.element(name, selector) ⇒ <code>[Element](#Element)</code>
**Kind**: instance method of <code>[Interface](#Interface)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| selector | <code>string</code> | 

<a name="Interface+elements"></a>
### interface.elements(name, selector) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
**Kind**: instance method of <code>[Interface](#Interface)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| selector | <code>string</code> | 

<a name="Interface+section"></a>
### interface.section(SubInterface, name, selector) ⇒ <code>[Interface](#Interface)</code>
**Kind**: instance method of <code>[Interface](#Interface)</code>  

| Param | Type |
| --- | --- |
| SubInterface | <code>[Interface](#Interface)</code> | 
| name | <code>string</code> | 
| selector | <code>string</code> | 

<a name="Interface+sections"></a>
### interface.sections(SubInterface, name, selector) ⇒ <code>[Interfaces](#Interfaces)</code>
**Kind**: instance method of <code>[Interface](#Interface)</code>  

| Param | Type |
| --- | --- |
| SubInterface | <code>[Interface](#Interface)</code> | 
| name | <code>string</code> | 
| selector | <code>string</code> | 

<a name="Interfaces"></a>
## Interfaces
represents a collection of Interfaces

**Kind**: global class  

* [Interfaces](#Interfaces)
    * [new Interfaces(SubInterface, adapter)](#new_Interfaces_new)
    * [.adapter](#Interfaces+adapter) ⇒ <code>Object</code>
    * [.length](#Interfaces+length) ⇒ <code>Promise.&lt;int&gt;</code>
    * [.first](#Interfaces+first) ⇒ <code>[Element](#Element)</code>
    * [.last](#Interfaces+last) ⇒ <code>[Element](#Element)</code>
    * [.at(nth)](#Interfaces+at) ⇒ <code>[Element](#Element)</code>

<a name="new_Interfaces_new"></a>
### new Interfaces(SubInterface, adapter)

| Param | Type | Description |
| --- | --- | --- |
| SubInterface | <code>Inteface</code> | class |
| adapter | <code>Object</code> |  |

<a name="Interfaces+adapter"></a>
### interfaces.adapter ⇒ <code>Object</code>
**Kind**: instance property of <code>[Interfaces](#Interfaces)</code>  
<a name="Interfaces+length"></a>
### interfaces.length ⇒ <code>Promise.&lt;int&gt;</code>
promises to return the length of interfaces in the collection

**Kind**: instance property of <code>[Interfaces](#Interfaces)</code>  
<a name="Interfaces+first"></a>
### interfaces.first ⇒ <code>[Element](#Element)</code>
returns an object that represents the first inteface in collection

**Kind**: instance property of <code>[Interfaces](#Interfaces)</code>  
<a name="Interfaces+last"></a>
### interfaces.last ⇒ <code>[Element](#Element)</code>
returns an object that represents the last inteface in the collection

**Kind**: instance property of <code>[Interfaces](#Interfaces)</code>  
<a name="Interfaces+at"></a>
### interfaces.at(nth) ⇒ <code>[Element](#Element)</code>
returns an object that represents the nth inteface in collection

**Kind**: instance method of <code>[Interfaces](#Interfaces)</code>  

| Param | Type |
| --- | --- |
| nth | <code>number</code> | 


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
Generated: Sat 26 Dec 2015 10:51:32 GMT
