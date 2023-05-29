"use strict";(self.webpackChunkgo_micro=self.webpackChunkgo_micro||[]).push([[8825],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>g});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),c=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},h=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=c(t),h=r,g=u["".concat(s,".").concat(h)]||u[h]||m[h]||l;return t?a.createElement(g,i(i({ref:n},p),{},{components:t})):a.createElement(g,i({ref:n},p))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=h;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[u]="string"==typeof e?e:r,i[1]=o;for(var c=2;c<l;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},7511:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var a=t(7462),r=(t(7294),t(3905));const l={title:"The interface and inheritance of Golang",description:"The interface and inheritance of Golang",tags:["go","golang","c","c++","interface","inheritance"],hide_table_of_contents:!1},i=void 0,o={permalink:"/2023/05/25/the-interface-and-inheritance-of-golang",source:"@site/blog/2023-05-25-the-interface-and-inheritance-of-golang.md",title:"The interface and inheritance of Golang",description:"The interface and inheritance of Golang",date:"2023-05-25T00:00:00.000Z",formattedDate:"May 25, 2023",tags:[{label:"go",permalink:"/tags/go"},{label:"golang",permalink:"/tags/golang"},{label:"c",permalink:"/tags/c"},{label:"interface",permalink:"/tags/interface"},{label:"inheritance",permalink:"/tags/inheritance"}],readingTime:4.76,hasTruncateMarker:!0,authors:[],frontMatter:{title:"The interface and inheritance of Golang",description:"The interface and inheritance of Golang",tags:["go","golang","c","c++","interface","inheritance"],hide_table_of_contents:!1},nextItem:{title:"Flutter Theme Demo",permalink:"/2019/09/10/flutter-theme-demo"}},s={authorsImageUrls:[]},c=[{value:"Golang interface and inheritance",id:"golang-interface-and-inheritance",level:2},{value:"Single inheritance",id:"single-inheritance",level:3},{value:"1. Only interface",id:"1-only-interface",level:4},{value:"2. Has a base class",id:"2-has-a-base-class",level:4},{value:"Multiple inheritance",id:"multiple-inheritance",level:3}],p={toc:c},u="wrapper";function m(e){let{components:n,...t}=e;return(0,r.kt)(u,(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"golang-interface-and-inheritance"},"Golang interface and inheritance"),(0,r.kt)("p",null,"Golang is a C-like language designed by Google. It's a language used to replace Python. It's more C, more process-oriented, not C++, and not so object-oriented. However, I still want to achieve something similar to C++ Interface. In fact, it can be done, although the writing method is more C."),(0,r.kt)("h3",{id:"single-inheritance"},"Single inheritance"),(0,r.kt)("p",null,"Single inheritance simply means that there is only one parent class. In terms of specific implementation, I have done two experiments:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Only interface"),(0,r.kt)("li",{parentName:"ol"},"Has a base class")),(0,r.kt)("h4",{id:"1-only-interface"},"1. Only interface"),(0,r.kt)("p",null,"In C++, the pseudo-code is implemented as:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"typedef struct interface;\n\ninterface IFruit {\n    virtual string GetName() const = 0;\n    virtual void SetName(string name) = 0;\n    \n    virtual Type GetType() const = 0;\n};\n\nclass Apple : public IFruit {\npublic:\n    virtual string GetName() const {}\n    virtual void SetName(string name) {}\n\n    virtual Type GetType() const {}\n};\n")),(0,r.kt)("p",null,"The implementation in Golang is probably like this:"),(0,r.kt)("p",null,"Let's define an interface first:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"type Fruit interface {\n    GetName() string\n    SetName(name string)\n    \n    GetType() Type\n}\n")),(0,r.kt)("p",null,"We have an Apple object:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"type Apple struct {\n    name    string\n}\n\nfunc NewApple(name string) *Apple {\n    c := &Apple{}\n    c.name = name\n    return c\n}\n\nfunc (c *Apple) GetName() string {\n    return c.name\n}\n\nfunc (c *Apple) SetName(name string) {\n    c.name = name\n}\n\nfunc (c *Apple) GetType() Type {\n    return AppleType\n}\n")),(0,r.kt)("p",null,"We have a NewApple here for creating new apples, and this method can be used in two ways:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Assign to interface",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-go"},'var fruitApple Fruit\nfruitApple = NewApple("big")\n'))),(0,r.kt)("li",{parentName:"ol"},"Assign to yourself",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-go"},'apple := NewApple("big")\n')))),(0,r.kt)("p",null,"You can also use the factory method NewFruit provided by the base class to create fruits:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'apple := NewFruit(AppleType, "big")\nbanana := NewFruit(BananaType, "big")\n')),(0,r.kt)("h4",{id:"2-has-a-base-class"},"2. Has a base class"),(0,r.kt)("p",null,"In C++, the pseudo-code is implemented as:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"typedef struct interface;\n\ninterface IVehicle {\n    virtual string GetName() const = 0;\n    virtual void SetName(string name) = 0;\n\n    virtual Type GetType() const = 0;\n\n    virtual int GetWheelCount() const = 0;\n    virtual void SetWheelCount(count int) = 0;\n\n    virtual string ToString() const = 0;\n};\n\nclass VehicleBase: public IVehicle {\n    virtual string ToString() const {}\n};\n\nclass Bus : public VehicleBase {\npublic:\n    virtual string GetName() const {}\n    virtual void SetName(string name) {}\n\n    virtual Type GetType() const {}\n\n    virtual int GetWheelCount() const {}\n    virtual void SetWheelCount(count int) {}\n\n    virtual string ToString() const {}\n};\n")),(0,r.kt)("p",null,"The implementation in Golang is probably like this:"),(0,r.kt)("p",null,"Let's define an interface first:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"type Vehicle interface {\n    GetType() Type\n    \n    GetName() string\n    SetName(name string)\n\n    GetWheelCount() int\n    SetWheelCount(count int)\n    \n    ToString() string\n}\n")),(0,r.kt)("p",null,"And another base class:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'type vehicleBase struct {\n    wheelCount int\n}\n\nfunc (c *vehicleBase) GetWheelCount() int {\n    return c.wheelCount\n}\n\nfunc (c *vehicleBase) SetWheelCount(count int) {\n    c.wheelCount = count\n}\n\nfunc (c *vehicleBase) ToString() string {\n    return "vehicle -> "\n}\n')),(0,r.kt)("p",null,"Then let's take some buses. Yes, it combines base classes ",(0,r.kt)("strong",{parentName:"p"},"vehicleBase"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},"type Bus struct {\n    vehicleBase\n    name string\n}\n")),(0,r.kt)("p",null,"Here the bus overrides the base class, and we can call it like this: b.vehicleBase.ToString()"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'func (b *Bus) ToString() string {\n    str := fmt.Sprintf("Bus -> %s", b.GetName())\n    return b.vehicleBase.ToString() + str\n}\n')),(0,r.kt)("h3",{id:"multiple-inheritance"},"Multiple inheritance"),(0,r.kt)("p",null,"Multiple inheritance means having more than one parent class."),(0,r.kt)("p",null,"In C++, the pseudo-code is implemented as:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"class Father {\n    virtual string GetName() const {}\n    virtual string Say() const {}\n};\n\nclass Mother {\n    virtual string GetName() const {}\n    virtual string Say() const {}\n};\n\nclass Child : public Father, public Mother {\n    virtual string GetName() const {}\n    virtual string Say() const {\n        Father::GetName();\n        Mother::GetName();\n    }\n};\n")),(0,r.kt)("p",null,"In Golang, let's make dad first:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'type Father struct {\n}\n\nfunc NewFather() *Father {\n    return &Father{}\n}\n\nfunc (c *Father) GetName() string {\n    return "ThangN"\n}\n\nfunc (c *Father) Say() string {\n    return "I am " + c.GetName()\n}\n')),(0,r.kt)("p",null,"So let's start with a mother:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'type Mother struct {\n}\n\nfunc NewMother() *Mother {\n    return &Mother{}\n}\n\nfunc (m *Mother) GetName() string {\n    return "HienNTT"\n}\n\nfunc (m *Mother) Say() string {\n    return "I am " + m.GetName()\n}\n')),(0,r.kt)("p",null,"Now, let's make a parent's successor:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'type Child struct {\n    *Mother\n    Father\n}\n\nfunc NewChild() *Child {\n    return &Child{}\n}\n\nfunc (c *Child) GetName() string {\n    return "BaoNG"\n}\n\nfunc (c *Child) Say() string {\n    return "I am " + c.GetName() + ", My Father is " + c.Father.GetName() + ", My Mother is " + c.Mother.GetName()\n}\n')),(0,r.kt)("p",null,"In fact, it's nothing, the key lies in anonymous members ",(0,r.kt)("strong",{parentName:"p"},"*Mother")," and ",(0,r.kt)("strong",{parentName:"p"},"Father"),". Here, there are two ways of inheritance:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Non-pointer inheritance")),(0,r.kt)("blockquote",null,(0,r.kt)("ol",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ol"},"When the derived class does not override the member method of the base class, the corresponding member method is inherited."),(0,r.kt)("li",{parentName:"ol"},"The derived class can directly call the member method of the base class. For example, if the base class has a member method Base.Func(), then Derived.Func() is equivalent to Derived.Base.Func()."),(0,r.kt)("li",{parentName:"ol"},"If the name of the member method of the derived class is the same as that of the base class, the base class method will be overwritten or hidden. For example, both the base class and the derived class have a member method Func(), then Derived.Func() will only Call the Func() method of the derived class. If you want to call the base class version, you can call it through Derived.Base.Func()."))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Combination of pointers")),(0,r.kt)("blockquote",null,(0,r.kt)("ol",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ol"},"The combination of the base class using the pointer method still has the effect of derivation, but when the derived class creates an instance, a pointer to the base class instance needs to be provided externally."),(0,r.kt)("li",{parentName:"ol"},"Other rules are the same as for non-pointer combinations."))),(0,r.kt)("p",null,"Code repository: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/devexps/go-examples/tree/main/inheritance"},"https://github.com/devexps/go-examples/inheritance")))}m.isMDXComponent=!0}}]);