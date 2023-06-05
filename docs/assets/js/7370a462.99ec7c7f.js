"use strict";(self.webpackChunkgo_micro=self.webpackChunkgo_micro||[]).push([[1926],{3905:(e,t,o)=>{o.d(t,{Zo:()=>s,kt:()=>d});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function p(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var c=n.createContext({}),l=function(e){var t=n.useContext(c),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},s=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(o),m=r,d=u["".concat(c,".").concat(m)]||u[m]||g[m]||a;return o?n.createElement(d,i(i({ref:t},s),{},{components:o})):n.createElement(d,i({ref:t},s))}));function d(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,i=new Array(a);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[u]="string"==typeof e?e:r,i[1]=p;for(var l=2;l<a;l++)i[l]=o[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},3489:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var n=o(7462),r=(o(7294),o(3905));const a={title:"Usage",description:"Use Micro tools, create Protobuf templates, create Go engineering projects, create Service templates",keywords:["Go","Go-Micro","Toolkit","Framework","Microservices","Protobuf","gRPC","HTTP"],sidebar_position:2},i="Usage",p={unversionedId:"getting-started/usage",id:"getting-started/usage",title:"Usage",description:"Use Micro tools, create Protobuf templates, create Go engineering projects, create Service templates",source:"@site/docs-go-micro/getting-started/usage.md",sourceDirName:"getting-started",slug:"/getting-started/usage",permalink:"/go-micro/getting-started/usage",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Usage",description:"Use Micro tools, create Protobuf templates, create Go engineering projects, create Service templates",keywords:["Go","Go-Micro","Toolkit","Framework","Microservices","Protobuf","gRPC","HTTP"],sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Quick Start",permalink:"/go-micro/getting-started/start"}},c={},l=[{value:"Installation",id:"installation",level:2},{value:"Create Project",id:"create-project",level:2},{value:"Run the project",id:"run-the-project",level:2},{value:"View help",id:"view-help",level:2}],s={toc:l},u="wrapper";function g(e){let{components:t,...o}=e;return(0,r.kt)(u,(0,n.Z)({},s,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"usage"},"Usage"),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"go install github.com/devexps/go-micro/cmd/micro/v2@latest\n")),(0,r.kt)("h2",{id:"create-project"},"Create Project"),(0,r.kt)("p",null,"Create a project template with the ",(0,r.kt)("inlineCode",{parentName:"p"},"micro")," command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"micro new your_project\n")),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"By default, it adds a service called ",(0,r.kt)("inlineCode",{parentName:"p"},"helloworld")," corresponding with a proto.")),(0,r.kt)("p",null,"You can use ",(0,r.kt)("inlineCode",{parentName:"p"},"-r")," to specify source:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# Behind the scene if you don't specify source\nmicro new your_project -r https://github.com/devexps/go-layout.git\n\n# You can also use custom templates\nmicro new your_project -r xxx-layout.git\n\n# At the same time, you can also specify source through the environment variable\nMICRO_LAYOUT_REPO=xxx-layout.git\nmicro new your_project\n")),(0,r.kt)("p",null,"You can use ",(0,r.kt)("inlineCode",{parentName:"p"},"-b")," to specify branch:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"micro new your_project -b main\n")),(0,r.kt)("p",null,"You can use ",(0,r.kt)("inlineCode",{parentName:"p"},"--service-only")," to add services:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"micro new your_project\ncd your_project\nmicro new your_service --service-only\n")),(0,r.kt)("p",null,"The output you'll see:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},".\n\u251c\u2500\u2500 .docker\n\u2502    \u2514\u2500\u2500 Dockerfile\n\u251c\u2500\u2500 LICENSE\n\u251c\u2500\u2500 README.md\n\u251c\u2500\u2500 api\n\u2502    \u251c\u2500\u2500 go.mod\n\u2502    \u251c\u2500\u2500 go.sum\n\u2502    \u251c\u2500\u2500 proto\n\u2502    \u2502    \u251c\u2500\u2500 common\n\u2502    \u2502    \u2502    \u2514\u2500\u2500 conf\n\u2502    \u2502    \u2502        \u251c\u2500\u2500 auth.proto\n\u2502    \u2502    \u2502        \u251c\u2500\u2500 bootstrap.proto\n\u2502    \u2502    \u2502        \u251c\u2500\u2500 config.proto\n\u2502    \u2502    \u2502        \u251c\u2500\u2500 data.proto\n\u2502    \u2502    \u2502        \u251c\u2500\u2500 logger.proto\n\u2502    \u2502    \u2502        \u251c\u2500\u2500 registry.proto\n\u2502    \u2502    \u2502        \u251c\u2500\u2500 server.proto\n\u2502    \u2502    \u2502        \u2514\u2500\u2500 trace.proto\n\u2502    \u2502    \u2514\u2500\u2500 helloworld\n\u2502    \u2502        \u2514\u2500\u2500 v1\n\u2502    \u2502            \u251c\u2500\u2500 error_reason.proto\n\u2502    \u2502            \u2514\u2500\u2500 greeter.proto\n\u2502    \u2514\u2500\u2500 third_party\n\u2502        \u251c\u2500\u2500 README.md\n\u2502        \u251c\u2500\u2500 errors\n\u2502        \u2502    \u2514\u2500\u2500 errors.proto\n\u2502        \u251c\u2500\u2500 google\n\u2502        \u2502    \u251c\u2500\u2500 api\n\u2502        \u2502    \u2502    \u251c\u2500\u2500 annotations.proto\n\u2502        \u2502    \u2502    \u251c\u2500\u2500 client.proto\n\u2502        \u2502    \u2502    \u251c\u2500\u2500 field_behavior.proto\n\u2502        \u2502    \u2502    \u251c\u2500\u2500 http.proto\n\u2502        \u2502    \u2502    \u2514\u2500\u2500 httpbody.proto\n\u2502        \u2502    \u2514\u2500\u2500 protobuf\n\u2502        \u2502        \u251c\u2500\u2500 any.proto\n\u2502        \u2502        \u251c\u2500\u2500 api.proto\n\u2502        \u2502        \u251c\u2500\u2500 compiler\n\u2502        \u2502        \u2502    \u2514\u2500\u2500 plugin.proto\n\u2502        \u2502        \u251c\u2500\u2500 descriptor.proto\n\u2502        \u2502        \u251c\u2500\u2500 duration.proto\n\u2502        \u2502        \u251c\u2500\u2500 empty.proto\n\u2502        \u2502        \u251c\u2500\u2500 field_mask.proto\n\u2502        \u2502        \u251c\u2500\u2500 source_context.proto\n\u2502        \u2502        \u251c\u2500\u2500 struct.proto\n\u2502        \u2502        \u251c\u2500\u2500 timestamp.proto\n\u2502        \u2502        \u251c\u2500\u2500 type.proto\n\u2502        \u2502        \u2514\u2500\u2500 wrappers.proto\n\u2502        \u251c\u2500\u2500 openapi\n\u2502        \u2502    \u2514\u2500\u2500 v3\n\u2502        \u2502        \u251c\u2500\u2500 annotations.proto\n\u2502        \u2502        \u2514\u2500\u2500 openapi.proto\n\u2502        \u2514\u2500\u2500 validate\n\u2502            \u251c\u2500\u2500 README.md\n\u2502            \u2514\u2500\u2500 validate.proto\n\u251c\u2500\u2500 go.mod\n\u251c\u2500\u2500 helloworld\n\u2502    \u251c\u2500\u2500 Makefile\n\u2502    \u251c\u2500\u2500 cmd\n\u2502    \u2502    \u2514\u2500\u2500 server\n\u2502    \u2502        \u251c\u2500\u2500 main.go\n\u2502    \u2502        \u251c\u2500\u2500 tools.go\n\u2502    \u2502        \u251c\u2500\u2500 wire.go\n\u2502    \u2502        \u2514\u2500\u2500 wire_gen.go\n\u2502    \u251c\u2500\u2500 configs\n\u2502    \u2502    \u2514\u2500\u2500 config.yaml\n\u2502    \u251c\u2500\u2500 go.mod\n\u2502    \u251c\u2500\u2500 go.sum\n\u2502    \u2514\u2500\u2500 internal\n\u2502        \u251c\u2500\u2500 biz\n\u2502        \u2502    \u251c\u2500\u2500 greeter.go\n\u2502        \u2502    \u2514\u2500\u2500 init.go\n\u2502        \u251c\u2500\u2500 data\n\u2502        \u2502    \u251c\u2500\u2500 data.go\n\u2502        \u2502    \u251c\u2500\u2500 greeter.go\n\u2502        \u2502    \u2514\u2500\u2500 init.go\n\u2502        \u251c\u2500\u2500 server\n\u2502        \u2502    \u251c\u2500\u2500 grpc.go\n\u2502        \u2502    \u251c\u2500\u2500 http.go\n\u2502        \u2502    \u2514\u2500\u2500 init.go\n\u2502        \u2514\u2500\u2500 service\n\u2502            \u251c\u2500\u2500 greeter.go\n\u2502            \u2514\u2500\u2500 init.go\n\u2514\u2500\u2500 pkg\n    \u251c\u2500\u2500 bootstrap\n    \u2502    \u251c\u2500\u2500 bootstrap.go\n    \u2502    \u251c\u2500\u2500 config.go\n    \u2502    \u251c\u2500\u2500 daemon.go\n    \u2502    \u251c\u2500\u2500 flag.go\n    \u2502    \u251c\u2500\u2500 grpc.go\n    \u2502    \u251c\u2500\u2500 http.go\n    \u2502    \u251c\u2500\u2500 logger.go\n    \u2502    \u251c\u2500\u2500 registry.go\n    \u2502    \u251c\u2500\u2500 service_info.go\n    \u2502    \u2514\u2500\u2500 trace.go\n    \u251c\u2500\u2500 go.mod\n    \u251c\u2500\u2500 go.sum\n    \u2514\u2500\u2500 service\n        \u2514\u2500\u2500 name.go\n")),(0,r.kt)("h2",{id:"run-the-project"},"Run the project"),(0,r.kt)("p",null,"If there are multiple services under the project, a selection menu will appear."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"micro run\n")),(0,r.kt)("h2",{id:"view-help"},"View help"),(0,r.kt)("p",null,"You can add ",(0,r.kt)("inlineCode",{parentName:"p"},"-h")," to any command to view help in detail"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"micro -h\nmicro new -h\n")))}g.isMDXComponent=!0}}]);