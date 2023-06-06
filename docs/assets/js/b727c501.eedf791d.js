"use strict";(self.webpackChunkgo_micro=self.webpackChunkgo_micro||[]).push([[6971],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>g});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(r),d=o,g=u["".concat(c,".").concat(d)]||u[d]||m[d]||a;return r?n.createElement(g,i(i({ref:t},p),{},{components:r})):n.createElement(g,i({ref:t},p))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5340:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var n=r(7462),o=(r(7294),r(3905));const a={title:"Quick Start",description:"Go-Micro microservice framework, quickly create project code, and generate Go engineering projects",keywords:["Go","Go-Micro","Toolkit","Framework","Microservices","Protobuf","gRPC","HTTP"],sidebar_position:1},i=void 0,l={unversionedId:"getting-started/start",id:"getting-started/start",title:"Quick Start",description:"Go-Micro microservice framework, quickly create project code, and generate Go engineering projects",source:"@site/docs-go-micro/getting-started/start.md",sourceDirName:"getting-started",slug:"/getting-started/start",permalink:"/go-micro/getting-started/start",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Quick Start",description:"Go-Micro microservice framework, quickly create project code, and generate Go engineering projects",keywords:["Go","Go-Micro","Toolkit","Framework","Microservices","Protobuf","gRPC","HTTP"],sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/go-micro/category/getting-started"},next:{title:"Usage",permalink:"/go-micro/getting-started/usage"}},c={},s=[{value:"Environment Requirements",id:"environment-requirements",level:2},{value:"Micro command tool",id:"micro-command-tool",level:2},{value:"Create project",id:"create-project",level:2},{value:"Code generation and execution",id:"code-generation-and-execution",level:2},{value:"Generate",id:"generate",level:3},{value:"Run",id:"run",level:3},{value:"Output",id:"output",level:3},{value:"Test interface",id:"test-interface",level:2},{value:"Test with HTTP interface",id:"test-with-http-interface",level:3},{value:"Test with GRPC interface",id:"test-with-grpc-interface",level:3},{value:"Project template",id:"project-template",level:2},{value:"Custom project template",id:"custom-project-template",level:2}],p={toc:s},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"environment-requirements"},"Environment Requirements"),(0,o.kt)("p",null,"First, you need to install the corresponding dependent environment and tools:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://golang.org/dl/"},"go")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/protocolbuffers/protobuf"},"protoc")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/protocolbuffers/protobuf-go"},"protoc-gen-go"))),(0,o.kt)("p",null,"It's recommended to enable ",(0,o.kt)("inlineCode",{parentName:"p"},"GO111MODULE")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"go env -w GO111MODULE=on\n")),(0,o.kt)("h2",{id:"micro-command-tool"},"Micro command tool"),(0,o.kt)("p",null,"Micro is the best tool for the Go-Micro framework, micro can:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Quickly create projects & services from templates"),(0,o.kt)("li",{parentName:"ul"},"Use commands commonly used during development")),(0,o.kt)("p",null,"In order for the next steps to proceed smoothly, the micro command tool needs to ",(0,o.kt)("a",{parentName:"p",href:"/go-micro/getting-started/usage#Installation"},"be installed")),(0,o.kt)("h2",{id:"create-project"},"Create project"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Create a project using the default template\nmicro new my_project\n\n# Remember, it creates a new `helloworld` service (by default)\n# Enter your project > service directory\ncd my_project/helloworld\n")),(0,o.kt)("h2",{id:"code-generation-and-execution"},"Code generation and execution"),(0,o.kt)("h3",{id:"generate"},"Generate"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Generate all proto source code, wire, etc.\nmake all\n")),(0,o.kt)("h3",{id:"run"},"Run"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Run the service\nmake run\n\n# Use Micro's run command\nmicro run\n")),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"DEBUG msg=config loaded: config.yaml format: yaml # load by default configs/config.yaml configuration file\nINFO msg=[HTTP] server listening on: [::]:8080\nINFO msg=[gRPC] server listening on: [::]:9090\n")),(0,o.kt)("h2",{id:"test-interface"},"Test interface"),(0,o.kt)("h3",{id:"test-with-http-interface"},"Test with HTTP interface"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'curl \'http://127.0.0.1:8080/helloworld/go-micro\'\n\nThe response should be:\n{\n  "message": "Hello go-micro"\n}\n')),(0,o.kt)("h3",{id:"test-with-grpc-interface"},"Test with GRPC interface"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'grpcurl -plaintext -d \'{"name":"go-micro"}\' 127.0.0.1:9090 helloworld.v1.Greeter.SayHello\n\nThe response should be:\n{\n  "message": "Hello go-micro"\n}\n')),(0,o.kt)("h2",{id:"project-template"},"Project template"),(0,o.kt)("p",null,"Micro manages templates through Git repositories and initializes by pulling templates when creating projects and services. The default template address is:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/devexps/go-layout"},"\u3010Github\u3011Micro Layout"))),(0,o.kt)("h2",{id:"custom-project-template"},"Custom project template"),(0,o.kt)("p",null,"You can also create your own templates, to save time when you need to do it every time."))}m.isMDXComponent=!0}}]);