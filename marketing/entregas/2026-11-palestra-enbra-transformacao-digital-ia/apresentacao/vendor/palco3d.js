var Palco3D=(()=>{var Br=Object.defineProperty;var ph=Object.getOwnPropertyDescriptor;var mh=Object.getOwnPropertyNames;var gh=Object.prototype.hasOwnProperty;var xh=(n,t)=>{for(var e in t)Br(n,e,{get:t[e],enumerable:!0})},yh=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of mh(t))!gh.call(n,s)&&s!==e&&Br(n,s,{get:()=>t[s],enumerable:!(i=ph(t,s))||i.enumerable});return n};var Sh=n=>yh(Br({},"__esModule",{value:!0}),n);var Rg={};xh(Rg,{criar:()=>bg});var Qo="170";var Ih=0,Rl=1,Eh=2;var Gc=1,vh=2,mi=3,ki=0,we=1,xi=2,si=0,yn=1,vn=2,Pl=3,_l=4,Mh=5,Vi=100,Th=101,bh=102,Rh=103,Ph=104,_h=200,wh=201,Ch=202,Ah=203,Ta=204,ba=205,Uh=206,kh=207,Hh=208,Fh=209,Nh=210,Oh=211,Gh=212,Dh=213,zh=214,Ra=0,Pa=1,_a=2,Mn=3,wa=4,Ca=5,Aa=6,Ua=7,qo=0,Bh=1,Lh=2,ri=0,$o=1,tl=2,el=3,il=4,Wh=5,nl=6,sl=7;var Dc=300,Tn=301,bn=302,ka=303,Ha=304,wr=306,Fa=1e3,ji=1001,Na=1002,Oe=1003,Jh=1004;var ms=1005;var ii=1006,Lr=1007;var Xi=1008;var Ii=1009,zc=1010,Bc=1011,ns=1012,rl=1013,Ki=1014,ni=1015,ze=1016,al=1017,ol=1018,Rn=1020,Lc=35902,Wc=1021,Jc=1022,Ke=1023,Zc=1024,Vc=1025,Sn=1026,Pn=1027,ll=1028,cl=1029,Yc=1030,hl=1031;var ul=1033,Vs=33776,Ys=33777,js=33778,Xs=33779,Oa=35840,Ga=35841,Da=35842,za=35843,Ba=36196,La=37492,Wa=37496,Ja=37808,Za=37809,Va=37810,Ya=37811,ja=37812,Xa=37813,Ka=37814,Qa=37815,qa=37816,$a=37817,to=37818,eo=37819,io=37820,no=37821,Ks=36492,so=36494,ro=36495,jc=36283,ao=36284,oo=36285,lo=36286;var qs=2300,co=2301,Wr=2302,wl=2400,Cl=2401,Al=2402;var Zh=3200,Vh=3201;var dl=0,Yh=1,Ai="",ke="srgb",On="srgb-linear",Cr="linear",qt="srgb";var en=7680;var Ul=519,jh=512,Xh=513,Kh=514,Xc=515,Qh=516,qh=517,$h=518,tu=519,kl=35044;var Hl="300 es",yi=2e3,$s=2001,Hi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Qs=Math.PI/180,ho=180/Math.PI;function cs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]).toLowerCase()}function Ie(n,t,e){return Math.max(t,Math.min(e,n))}function eu(n,t){return(n%t+t)%t}function Jr(n,t,e){return(1-e)*n+e*t}function Wn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ue(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Et=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},zt=class n{constructor(t,e,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],g=i[8],y=s[0],m=s[3],d=s[6],b=s[1],T=s[4],E=s[7],N=s[2],_=s[5],w=s[8];return r[0]=a*y+o*b+l*N,r[3]=a*m+o*T+l*_,r[6]=a*d+o*E+l*w,r[1]=c*y+h*b+u*N,r[4]=c*m+h*T+u*_,r[7]=c*d+h*E+u*w,r[2]=f*y+p*b+g*N,r[5]=f*m+p*T+g*_,r[8]=f*d+p*E+g*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,p=c*r-a*l,g=e*u+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=u*y,t[1]=(s*c-h*i)*y,t[2]=(o*i-s*a)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=p*y,t[7]=(i*l-c*e)*y,t[8]=(a*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Zr.makeScale(t,e)),this}rotate(t){return this.premultiply(Zr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Zr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Zr=new zt;function Kc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function tr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function iu(){let n=tr("canvas");return n.style.display="block",n}var Fl={};function qn(n){n in Fl||(Fl[n]=!0,console.warn(n))}function nu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function su(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ru(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Vt={enabled:!0,workingColorSpace:On,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===qt&&(n.r=Si(n.r),n.g=Si(n.g),n.b=Si(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===qt&&(n.r=In(n.r),n.g=In(n.g),n.b=In(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ai?Cr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function In(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Nl=[.64,.33,.3,.6,.15,.06],Ol=[.2126,.7152,.0722],Gl=[.3127,.329],Dl=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zl=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Vt.define({[On]:{primaries:Nl,whitePoint:Gl,transfer:Cr,toXYZ:Dl,fromXYZ:zl,luminanceCoefficients:Ol,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:Nl,whitePoint:Gl,transfer:qt,toXYZ:Dl,fromXYZ:zl,luminanceCoefficients:Ol,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}});var nn,uo=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{nn===void 0&&(nn=tr("canvas")),nn.width=t.width,nn.height=t.height;let i=nn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=nn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=tr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Si(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Si(e[i]/255)*255):e[i]=Si(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},au=0,er=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=cs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vr(s[a].image)):r.push(Vr(s[a]))}else r=Vr(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Vr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?uo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ou=0,Ge=class n extends Hi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=ji,s=ji,r=ii,a=Xi,o=Ke,l=Ii,c=n.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=cs(),this.name="",this.source=new er(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fa:t.x=t.x-Math.floor(t.x);break;case ji:t.x=t.x<0?0:1;break;case Na:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fa:t.y=t.y-Math.floor(t.y);break;case ji:t.y=t.y<0?0:1;break;case Na:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Dc;Ge.DEFAULT_ANISOTROPY=1;var te=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],y=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,E=(p+1)/2,N=(d+1)/2,_=(h+f)/4,w=(u+y)/4,F=(g+m)/4;return T>E&&T>N?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=_/i,r=w/i):E>N?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=_/s,r=F/s):N<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),i=w/r,s=F/r),this.set(i,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-y)/b,this.z=(f-h)/b,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fo=class extends Hi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new Ge(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new er(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ee=class extends fo{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},ir=class extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var po=class extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Fi=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],f=r[a+0],p=r[a+1],g=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=y;return}if(u!==y||l!==f||c!==p||h!==g){let m=1-o,d=l*f+c*p+h*g+u*y,b=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){let N=Math.sqrt(T),_=Math.atan2(N,d*b);m=Math.sin(m*_)/N,o=Math.sin(o*_)/N}let E=o*b;if(l=l*m+f*E,c=c*m+p*E,h=h*m+g*E,u=u*m+y*E,m===1-o){let N=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=N,c*=N,h*=N,u*=N}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-o*p,t[e+2]=c*g+h*p+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>u){let p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-e;return this._w=p*a+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Bl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Bl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yr.copy(this).projectOnVector(t),this.sub(Yr)}reflect(t){return this.sub(Yr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Yr=new P,Bl=new Fi,Ei=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Ye.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Ye.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Ye.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ye):Ye.fromBufferAttribute(r,a),Ye.applyMatrix4(t.matrixWorld),this.expandByPoint(Ye);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),gs.copy(i.boundingBox)),gs.applyMatrix4(t.matrixWorld),this.union(gs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ye),Ye.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Jn),xs.subVectors(this.max,Jn),sn.subVectors(t.a,Jn),rn.subVectors(t.b,Jn),an.subVectors(t.c,Jn),bi.subVectors(rn,sn),Ri.subVectors(an,rn),Di.subVectors(sn,an);let e=[0,-bi.z,bi.y,0,-Ri.z,Ri.y,0,-Di.z,Di.y,bi.z,0,-bi.x,Ri.z,0,-Ri.x,Di.z,0,-Di.x,-bi.y,bi.x,0,-Ri.y,Ri.x,0,-Di.y,Di.x,0];return!jr(e,sn,rn,an,xs)||(e=[1,0,0,0,1,0,0,0,1],!jr(e,sn,rn,an,xs))?!1:(ys.crossVectors(bi,Ri),e=[ys.x,ys.y,ys.z],jr(e,sn,rn,an,xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ye).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ye).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(hi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},hi=[new P,new P,new P,new P,new P,new P,new P,new P],Ye=new P,gs=new Ei,sn=new P,rn=new P,an=new P,bi=new P,Ri=new P,Di=new P,Jn=new P,xs=new P,ys=new P,zi=new P;function jr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){zi.fromArray(n,r);let o=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),l=t.dot(zi),c=e.dot(zi),h=i.dot(zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var lu=new Ei,Zn=new P,Xr=new P,vi=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):lu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zn.subVectors(t,this.center);let e=Zn.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Zn,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zn.copy(t.center).add(Xr)),this.expandByPoint(Zn.copy(t.center).sub(Xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},ui=new P,Kr=new P,Ss=new P,Pi=new P,Qr=new P,Is=new P,qr=new P,ss=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ui.copy(this.origin).addScaledVector(this.direction,e),ui.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Kr.copy(t).add(e).multiplyScalar(.5),Ss.copy(e).sub(t).normalize(),Pi.copy(this.origin).sub(Kr);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ss),o=Pi.dot(this.direction),l=-Pi.dot(Ss),c=Pi.lengthSq(),h=Math.abs(1-a*a),u,f,p,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){let y=1/h;u*=y,f*=y,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Kr).addScaledVector(Ss,f),p}intersectSphere(t,e){ui.subVectors(t.center,this.origin);let i=ui.dot(this.direction),s=ui.dot(ui)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ui)!==null}intersectTriangle(t,e,i,s,r){Qr.subVectors(e,t),Is.subVectors(i,t),qr.crossVectors(Qr,Is);let a=this.direction.dot(qr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pi.subVectors(this.origin,t);let l=o*this.direction.dot(Is.crossVectors(Pi,Is));if(l<0)return null;let c=o*this.direction.dot(Qr.cross(Pi));if(c<0||l+c>a)return null;let h=-o*Pi.dot(qr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ee=class n{constructor(t,e,i,s,r,a,o,l,c,h,u,f,p,g,y,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,p,g,y,m)}set(t,e,i,s,r,a,o,l,c,h,u,f,p,g,y,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=y,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/on.setFromMatrixColumn(t,0).length(),r=1/on.setFromMatrixColumn(t,1).length(),a=1/on.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,p=a*u,g=o*h,y=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-y*c,e[9]=-o*l,e[2]=y-f*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f+y*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,p=l*u,g=c*h,y=c*u;e[0]=f-y*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=y-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,p=a*u,g=o*h,y=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+y,e[1]=l*u,e[5]=y*c+f,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,p=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=y-f*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-y*u}else if(t.order==="XZY"){let f=a*l,p=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+y,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=y*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cu,t,hu)}lookAt(t,e,i){let s=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),_i.crossVectors(i,Fe),_i.lengthSq()===0&&(Math.abs(i.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),_i.crossVectors(i,Fe)),_i.normalize(),Es.crossVectors(Fe,_i),s[0]=_i.x,s[4]=Es.x,s[8]=Fe.x,s[1]=_i.y,s[5]=Es.y,s[9]=Fe.y,s[2]=_i.z,s[6]=Es.z,s[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],g=i[2],y=i[6],m=i[10],d=i[14],b=i[3],T=i[7],E=i[11],N=i[15],_=s[0],w=s[4],F=s[8],M=s[12],I=s[1],C=s[5],Z=s[9],z=s[13],V=s[2],q=s[6],J=s[10],tt=s[14],B=s[3],ut=s[7],xt=s[11],Rt=s[15];return r[0]=a*_+o*I+l*V+c*B,r[4]=a*w+o*C+l*q+c*ut,r[8]=a*F+o*Z+l*J+c*xt,r[12]=a*M+o*z+l*tt+c*Rt,r[1]=h*_+u*I+f*V+p*B,r[5]=h*w+u*C+f*q+p*ut,r[9]=h*F+u*Z+f*J+p*xt,r[13]=h*M+u*z+f*tt+p*Rt,r[2]=g*_+y*I+m*V+d*B,r[6]=g*w+y*C+m*q+d*ut,r[10]=g*F+y*Z+m*J+d*xt,r[14]=g*M+y*z+m*tt+d*Rt,r[3]=b*_+T*I+E*V+N*B,r[7]=b*w+T*C+E*q+N*ut,r[11]=b*F+T*Z+E*J+N*xt,r[15]=b*M+T*z+E*tt+N*Rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],y=t[7],m=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*p-i*l*p)+y*(+e*l*p-e*c*f+r*a*f-s*a*p+s*c*h-r*l*h)+m*(+e*c*u-e*o*p-r*a*u+i*a*p+r*o*h-i*c*h)+d*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],y=t[13],m=t[14],d=t[15],b=u*m*c-y*f*c+y*l*p-o*m*p-u*l*d+o*f*d,T=g*f*c-h*m*c-g*l*p+a*m*p+h*l*d-a*f*d,E=h*y*c-g*u*c+g*o*p-a*y*p-h*o*d+a*u*d,N=g*u*l-h*y*l-g*o*f+a*y*f+h*o*m-a*u*m,_=e*b+i*T+s*E+r*N;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/_;return t[0]=b*w,t[1]=(y*f*r-u*m*r-y*s*p+i*m*p+u*s*d-i*f*d)*w,t[2]=(o*m*r-y*l*r+y*s*c-i*m*c-o*s*d+i*l*d)*w,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*p-i*l*p)*w,t[4]=T*w,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*w,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*d-e*l*d)*w,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*p+e*l*p)*w,t[8]=E*w,t[9]=(g*u*r-h*y*r-g*i*p+e*y*p+h*i*d-e*u*d)*w,t[10]=(a*y*r-g*o*r+g*i*c-e*y*c-a*i*d+e*o*d)*w,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*p-e*o*p)*w,t[12]=N*w,t[13]=(h*y*s-g*u*s+g*i*f-e*y*f-h*i*m+e*u*m)*w,t[14]=(g*o*s-a*y*s-g*i*l+e*y*l+a*i*m-e*o*m)*w,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*w,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,p=r*h,g=r*u,y=a*h,m=a*u,d=o*u,b=l*c,T=l*h,E=l*u,N=i.x,_=i.y,w=i.z;return s[0]=(1-(y+d))*N,s[1]=(p+E)*N,s[2]=(g-T)*N,s[3]=0,s[4]=(p-E)*_,s[5]=(1-(f+d))*_,s[6]=(m+b)*_,s[7]=0,s[8]=(g+T)*w,s[9]=(m-b)*w,s[10]=(1-(f+y))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=on.set(s[0],s[1],s[2]).length(),a=on.set(s[4],s[5],s[6]).length(),o=on.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],je.copy(this);let c=1/r,h=1/a,u=1/o;return je.elements[0]*=c,je.elements[1]*=c,je.elements[2]*=c,je.elements[4]*=h,je.elements[5]*=h,je.elements[6]*=h,je.elements[8]*=u,je.elements[9]*=u,je.elements[10]*=u,e.setFromRotationMatrix(je),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=yi){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),p,g;if(o===yi)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===$s)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=yi){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,p=(i+s)*h,g,y;if(o===yi)g=(a+r)*u,y=-2*u;else if(o===$s)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},on=new P,je=new ee,cu=new P(0,0,0),hu=new P(1,1,1),_i=new P,Es=new P,Fe=new P,Ll=new ee,Wl=new Fi,Qe=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Ll.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ll,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wl.setFromEuler(this),this.setFromQuaternion(Wl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qe.DEFAULT_ORDER="XYZ";var nr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},uu=0,Jl=new P,ln=new Fi,di=new ee,vs=new P,Vn=new P,du=new P,fu=new Fi,Zl=new P(1,0,0),Vl=new P(0,1,0),Yl=new P(0,0,1),jl={type:"added"},pu={type:"removed"},cn={type:"childadded",child:null},$r={type:"childremoved",child:null},me=class n extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new P,e=new Qe,i=new Fi,s=new P(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new zt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ln.setFromAxisAngle(t,e),this.quaternion.multiply(ln),this}rotateOnWorldAxis(t,e){return ln.setFromAxisAngle(t,e),this.quaternion.premultiply(ln),this}rotateX(t){return this.rotateOnAxis(Zl,t)}rotateY(t){return this.rotateOnAxis(Vl,t)}rotateZ(t){return this.rotateOnAxis(Yl,t)}translateOnAxis(t,e){return Jl.copy(t).applyQuaternion(this.quaternion),this.position.add(Jl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zl,t)}translateY(t){return this.translateOnAxis(Vl,t)}translateZ(t){return this.translateOnAxis(Yl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?vs.copy(t):vs.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Vn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(Vn,vs,this.up):di.lookAt(vs,Vn,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),ln.setFromRotationMatrix(di),this.quaternion.premultiply(ln.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jl),cn.child=t,this.dispatchEvent(cn),cn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pu),$r.child=t,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),di.multiply(t.parent.matrixWorld)),t.applyMatrix4(di),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jl),cn.child=t,this.dispatchEvent(cn),cn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vn,t,du),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vn,fu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};me.DEFAULT_UP=new P(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xe=new P,fi=new P,ta=new P,pi=new P,hn=new P,un=new P,Xl=new P,ea=new P,ia=new P,na=new P,sa=new te,ra=new te,aa=new te,Ui=class n{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Xe.subVectors(t,e),s.cross(Xe);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Xe.subVectors(s,e),fi.subVectors(i,e),ta.subVectors(t,e);let a=Xe.dot(Xe),o=Xe.dot(fi),l=Xe.dot(ta),c=fi.dot(fi),h=fi.dot(ta),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,pi.x),l.addScaledVector(a,pi.y),l.addScaledVector(o,pi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return sa.setScalar(0),ra.setScalar(0),aa.setScalar(0),sa.fromBufferAttribute(t,e),ra.fromBufferAttribute(t,i),aa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(sa,r.x),a.addScaledVector(ra,r.y),a.addScaledVector(aa,r.z),a}static isFrontFacing(t,e,i,s){return Xe.subVectors(i,e),fi.subVectors(t,e),Xe.cross(fi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Xe.cross(fi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;hn.subVectors(s,i),un.subVectors(r,i),ea.subVectors(t,i);let l=hn.dot(ea),c=un.dot(ea);if(l<=0&&c<=0)return e.copy(i);ia.subVectors(t,s);let h=hn.dot(ia),u=un.dot(ia);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(hn,a);na.subVectors(t,r);let p=hn.dot(na),g=un.dot(na);if(g>=0&&p<=g)return e.copy(r);let y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(un,o);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Xl.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(Xl,o);let d=1/(m+y+f);return a=y*d,o=f*d,e.copy(i).addScaledVector(hn,a).addScaledVector(un,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function oa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var St=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Vt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Vt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Vt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Vt.workingColorSpace){if(t=eu(t,1),e=Ie(e,0,1),i=Ie(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=oa(a,r,t+1/3),this.g=oa(a,r,t),this.b=oa(a,r,t-1/3)}return Vt.toWorkingColorSpace(this,s),this}setStyle(t,e=ke){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){let i=Qc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Si(t.r),this.g=Si(t.g),this.b=Si(t.b),this}copyLinearToSRGB(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return Vt.fromWorkingColorSpace(Re.copy(this),t),Math.round(Ie(Re.r*255,0,255))*65536+Math.round(Ie(Re.g*255,0,255))*256+Math.round(Ie(Re.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Vt.workingColorSpace){Vt.fromWorkingColorSpace(Re.copy(this),e);let i=Re.r,s=Re.g,r=Re.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Vt.workingColorSpace){return Vt.fromWorkingColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=ke){Vt.fromWorkingColorSpace(Re.copy(this),t);let e=Re.r,i=Re.g,s=Re.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(wi),this.setHSL(wi.h+t,wi.s+e,wi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(wi),t.getHSL(Ms);let i=Jr(wi.h,Ms.h,e),s=Jr(wi.s,Ms.s,e),r=Jr(wi.l,Ms.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Re=new St;St.NAMES=Qc;var mu=0,ai=class extends Hi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=cs(),this.name="",this.blending=yn,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ta,this.blendDst=ba,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=Mn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=en,this.stencilZFail=en,this.stencilZPass=en,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==yn&&(i.blending=this.blending),this.side!==ki&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ta&&(i.blendSrc=this.blendSrc),this.blendDst!==ba&&(i.blendDst=this.blendDst),this.blendEquation!==Vi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ul&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==en&&(i.stencilFail=this.stencilFail),this.stencilZFail!==en&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==en&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},oi=class extends ai{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var pe=new P,Ts=new Et,de=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=kl,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ts.fromBufferAttribute(this,e),Ts.applyMatrix3(t),this.setXY(e,Ts.x,Ts.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Wn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ue(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),i=Ue(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),i=Ue(i,this.array),s=Ue(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),i=Ue(i,this.array),s=Ue(s,this.array),r=Ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kl&&(t.usage=this.usage),t}};var sr=class extends de{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var rr=class extends de{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var le=class extends de{constructor(t,e,i){super(new Float32Array(t),e,i)}},gu=0,We=new ee,la=new me,dn=new P,Ne=new Ei,Yn=new Ei,ye=new P,ve=class n extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kc(t)?rr:sr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return We.makeRotationFromQuaternion(t),this.applyMatrix4(We),this}rotateX(t){return We.makeRotationX(t),this.applyMatrix4(We),this}rotateY(t){return We.makeRotationY(t),this.applyMatrix4(We),this}rotateZ(t){return We.makeRotationZ(t),this.applyMatrix4(We),this}translate(t,e,i){return We.makeTranslation(t,e,i),this.applyMatrix4(We),this}scale(t,e,i){return We.makeScale(t,e,i),this.applyMatrix4(We),this}lookAt(t){return la.lookAt(t),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dn).negate(),this.translate(dn.x,dn.y,dn.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new le(i,3))}else{for(let i=0,s=e.count;i<s;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ei);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Ne.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Ne.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Ne.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Ne.min),this.boundingBox.expandByPoint(Ne.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(Ne.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Yn.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(Ne.min,Yn.min),Ne.expandByPoint(ye),ye.addVectors(Ne.max,Yn.max),Ne.expandByPoint(ye)):(Ne.expandByPoint(Yn.min),Ne.expandByPoint(Yn.max))}Ne.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ye.fromBufferAttribute(o,c),l&&(dn.fromBufferAttribute(t,c),ye.add(dn)),s=Math.max(s,i.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new de(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let F=0;F<i.count;F++)o[F]=new P,l[F]=new P;let c=new P,h=new P,u=new P,f=new Et,p=new Et,g=new Et,y=new P,m=new P;function d(F,M,I){c.fromBufferAttribute(i,F),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,I),f.fromBufferAttribute(r,F),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,I),h.sub(c),u.sub(c),p.sub(f),g.sub(f);let C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),o[F].add(y),o[M].add(y),o[I].add(y),l[F].add(m),l[M].add(m),l[I].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let F=0,M=b.length;F<M;++F){let I=b[F],C=I.start,Z=I.count;for(let z=C,V=C+Z;z<V;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let T=new P,E=new P,N=new P,_=new P;function w(F){N.fromBufferAttribute(s,F),_.copy(N);let M=o[F];T.copy(M),T.sub(N.multiplyScalar(N.dot(M))).normalize(),E.crossVectors(_,M);let C=E.dot(l[F])<0?-1:1;a.setXYZW(F,T.x,T.y,T.z,C)}for(let F=0,M=b.length;F<M;++F){let I=b[F],C=I.start,Z=I.count;for(let z=C,V=C+Z;z<V;z+=3)w(t.getX(z+0)),w(t.getX(z+1)),w(t.getX(z+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let f=0,p=t.count;f<p;f+=3){let g=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h),p=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new de(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let f=c[h],p=t(f,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kl=new ee,Bi=new ss,bs=new vi,Ql=new P,Rs=new P,Ps=new P,_s=new P,ca=new P,ws=new P,ql=new P,Cs=new P,Jt=class extends me{constructor(t=new ve,e=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ws.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(ca.fromBufferAttribute(u,t),a?ws.addScaledVector(ca,h):ws.addScaledVector(ca.sub(e),h))}e.add(ws)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),bs.copy(i.boundingSphere),bs.applyMatrix4(r),Bi.copy(t.ray).recast(t.near),!(bs.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(bs,Ql)===null||Bi.origin.distanceToSquared(Ql)>(t.far-t.near)**2))&&(Kl.copy(r).invert(),Bi.copy(t.ray).applyMatrix4(Kl),!(i.boundingBox!==null&&Bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Bi)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=b,N=T;E<N;E+=3){let _=o.getX(E),w=o.getX(E+1),F=o.getX(E+2);s=As(this,d,t,i,c,h,u,_,w,F),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let b=o.getX(m),T=o.getX(m+1),E=o.getX(m+2);s=As(this,a,t,i,c,h,u,b,T,E),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let E=b,N=T;E<N;E+=3){let _=E,w=E+1,F=E+2;s=As(this,d,t,i,c,h,u,_,w,F),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let b=m,T=m+1,E=m+2;s=As(this,a,t,i,c,h,u,b,T,E),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function xu(n,t,e,i,s,r,a,o){let l;if(t.side===we?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ki,o),l===null)return null;Cs.copy(o),Cs.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Cs);return c<e.near||c>e.far?null:{distance:c,point:Cs.clone(),object:n}}function As(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Rs),n.getVertexPosition(l,Ps),n.getVertexPosition(c,_s);let h=xu(n,t,e,i,Rs,Ps,_s,ql);if(h){let u=new P;Ui.getBarycoord(ql,Rs,Ps,_s,u),s&&(h.uv=Ui.getInterpolatedAttribute(s,o,l,c,u,new Et)),r&&(h.uv1=Ui.getInterpolatedAttribute(r,o,l,c,u,new Et)),a&&(h.normal=Ui.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new P,materialIndex:0};Ui.getNormal(Rs,Ps,_s,f.normal),h.face=f,h.barycoord=u}return h}var Je=class n extends ve{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(u,2));function g(y,m,d,b,T,E,N,_,w,F,M){let I=E/w,C=N/F,Z=E/2,z=N/2,V=_/2,q=w+1,J=F+1,tt=0,B=0,ut=new P;for(let xt=0;xt<J;xt++){let Rt=xt*C-z;for(let Nt=0;Nt<q;Nt++){let Ut=Nt*I-Z;ut[y]=Ut*b,ut[m]=Rt*T,ut[d]=V,c.push(ut.x,ut.y,ut.z),ut[y]=0,ut[m]=0,ut[d]=_>0?1:-1,h.push(ut.x,ut.y,ut.z),u.push(Nt/w),u.push(1-xt/F),tt+=1}}for(let xt=0;xt<F;xt++)for(let Rt=0;Rt<w;Rt++){let Nt=f+Rt+q*xt,Ut=f+Rt+q*(xt+1),Y=f+(Rt+1)+q*(xt+1),nt=f+(Rt+1)+q*xt;l.push(Nt,Ut,nt),l.push(Ut,Y,nt),B+=6}o.addGroup(p,B,M),p+=B,f+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function _n(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ce(n){let t={};for(let e=0;e<n.length;e++){let i=_n(n[e]);for(let s in i)t[s]=i[s]}return t}function yu(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function qc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Vt.workingColorSpace}var Ni={clone:_n,merge:Ce},Su=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Iu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,fe=class extends ai{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Su,this.fragmentShader=Iu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_n(t.uniforms),this.uniformsGroups=yu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},ar=class extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=yi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ci=new P,$l=new Et,tc=new Et,Pe=class extends ar{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ho*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ho*2*Math.atan(Math.tan(Qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z)}getViewSize(t,e){return this.getViewBounds(t,$l,tc),e.subVectors(tc,$l)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Qs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},fn=-90,pn=1,mo=class extends me{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Pe(fn,pn,t,e);s.layers=this.layers,this.add(s);let r=new Pe(fn,pn,t,e);r.layers=this.layers,this.add(r);let a=new Pe(fn,pn,t,e);a.layers=this.layers,this.add(a);let o=new Pe(fn,pn,t,e);o.layers=this.layers,this.add(o);let l=new Pe(fn,pn,t,e);l.layers=this.layers,this.add(l);let c=new Pe(fn,pn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===yi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===$s)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},or=class extends Ge{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Tn,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},go=class extends Ee{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new or(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ii}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Je(5,5,5),r=new fe({name:"CubemapFromEquirect",uniforms:_n(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:we,blending:si});r.uniforms.tEquirect.value=e;let a=new Jt(s,r),o=e.minFilter;return e.minFilter===Xi&&(e.minFilter=ii),new mo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},ha=new P,Eu=new P,vu=new zt,gi=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=ha.subVectors(i,e).cross(Eu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(ha),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||vu.getNormalMatrix(t),s=this.coplanarPoint(ha).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Li=new vi,Us=new P,rs=class{constructor(t=new gi,e=new gi,i=new gi,s=new gi,r=new gi,a=new gi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=yi){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],y=s[10],m=s[11],d=s[12],b=s[13],T=s[14],E=s[15];if(i[0].setComponents(l-r,f-c,m-p,E-d).normalize(),i[1].setComponents(l+r,f+c,m+p,E+d).normalize(),i[2].setComponents(l+a,f+h,m+g,E+b).normalize(),i[3].setComponents(l-a,f-h,m-g,E-b).normalize(),i[4].setComponents(l-o,f-u,m-y,E-T).normalize(),e===yi)i[5].setComponents(l+o,f+u,m+y,E+T).normalize();else if(e===$s)i[5].setComponents(o,u,y,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Us.x=s.normal.x>0?t.max.x:t.min.x,Us.y=s.normal.y>0?t.max.y:t.min.y,Us.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function $c(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Mu(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){let g=u[f],y=u[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,u[f]=y)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){let y=u[p];n.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var wn=class n extends ve{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,p=[],g=[],y=[],m=[];for(let d=0;d<h;d++){let b=d*f-a;for(let T=0;T<c;T++){let E=T*u-r;g.push(E,-b,0),y.push(0,0,1),m.push(T/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<o;b++){let T=b+c*d,E=b+c*(d+1),N=b+1+c*(d+1),_=b+1+c*d;p.push(T,E,_),p.push(E,N,_)}this.setIndex(p),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(y,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Tu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ru=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_u=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Au=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ou=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ju=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Yu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ju=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ku=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,td="gl_FragColor = linearToOutputTexel( gl_FragColor );",ed=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,id=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,od=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ld=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ud=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,md=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Id=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ed=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Md=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Td=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ad=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,kd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Od=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,$d=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,af=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ff=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Tf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Af=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Uf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ff=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Of=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Df=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$f=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ip=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lt={alphahash_fragment:Tu,alphahash_pars_fragment:bu,alphamap_fragment:Ru,alphamap_pars_fragment:Pu,alphatest_fragment:_u,alphatest_pars_fragment:wu,aomap_fragment:Cu,aomap_pars_fragment:Au,batching_pars_vertex:Uu,batching_vertex:ku,begin_vertex:Hu,beginnormal_vertex:Fu,bsdfs:Nu,iridescence_fragment:Ou,bumpmap_pars_fragment:Gu,clipping_planes_fragment:Du,clipping_planes_pars_fragment:zu,clipping_planes_pars_vertex:Bu,clipping_planes_vertex:Lu,color_fragment:Wu,color_pars_fragment:Ju,color_pars_vertex:Zu,color_vertex:Vu,common:Yu,cube_uv_reflection_fragment:ju,defaultnormal_vertex:Xu,displacementmap_pars_vertex:Ku,displacementmap_vertex:Qu,emissivemap_fragment:qu,emissivemap_pars_fragment:$u,colorspace_fragment:td,colorspace_pars_fragment:ed,envmap_fragment:id,envmap_common_pars_fragment:nd,envmap_pars_fragment:sd,envmap_pars_vertex:rd,envmap_physical_pars_fragment:gd,envmap_vertex:ad,fog_vertex:od,fog_pars_vertex:ld,fog_fragment:cd,fog_pars_fragment:hd,gradientmap_pars_fragment:ud,lightmap_pars_fragment:dd,lights_lambert_fragment:fd,lights_lambert_pars_fragment:pd,lights_pars_begin:md,lights_toon_fragment:xd,lights_toon_pars_fragment:yd,lights_phong_fragment:Sd,lights_phong_pars_fragment:Id,lights_physical_fragment:Ed,lights_physical_pars_fragment:vd,lights_fragment_begin:Md,lights_fragment_maps:Td,lights_fragment_end:bd,logdepthbuf_fragment:Rd,logdepthbuf_pars_fragment:Pd,logdepthbuf_pars_vertex:_d,logdepthbuf_vertex:wd,map_fragment:Cd,map_pars_fragment:Ad,map_particle_fragment:Ud,map_particle_pars_fragment:kd,metalnessmap_fragment:Hd,metalnessmap_pars_fragment:Fd,morphinstance_vertex:Nd,morphcolor_vertex:Od,morphnormal_vertex:Gd,morphtarget_pars_vertex:Dd,morphtarget_vertex:zd,normal_fragment_begin:Bd,normal_fragment_maps:Ld,normal_pars_fragment:Wd,normal_pars_vertex:Jd,normal_vertex:Zd,normalmap_pars_fragment:Vd,clearcoat_normal_fragment_begin:Yd,clearcoat_normal_fragment_maps:jd,clearcoat_pars_fragment:Xd,iridescence_pars_fragment:Kd,opaque_fragment:Qd,packing:qd,premultiplied_alpha_fragment:$d,project_vertex:tf,dithering_fragment:ef,dithering_pars_fragment:nf,roughnessmap_fragment:sf,roughnessmap_pars_fragment:rf,shadowmap_pars_fragment:af,shadowmap_pars_vertex:of,shadowmap_vertex:lf,shadowmask_pars_fragment:cf,skinbase_vertex:hf,skinning_pars_vertex:uf,skinning_vertex:df,skinnormal_vertex:ff,specularmap_fragment:pf,specularmap_pars_fragment:mf,tonemapping_fragment:gf,tonemapping_pars_fragment:xf,transmission_fragment:yf,transmission_pars_fragment:Sf,uv_pars_fragment:If,uv_pars_vertex:Ef,uv_vertex:vf,worldpos_vertex:Mf,background_vert:Tf,background_frag:bf,backgroundCube_vert:Rf,backgroundCube_frag:Pf,cube_vert:_f,cube_frag:wf,depth_vert:Cf,depth_frag:Af,distanceRGBA_vert:Uf,distanceRGBA_frag:kf,equirect_vert:Hf,equirect_frag:Ff,linedashed_vert:Nf,linedashed_frag:Of,meshbasic_vert:Gf,meshbasic_frag:Df,meshlambert_vert:zf,meshlambert_frag:Bf,meshmatcap_vert:Lf,meshmatcap_frag:Wf,meshnormal_vert:Jf,meshnormal_frag:Zf,meshphong_vert:Vf,meshphong_frag:Yf,meshphysical_vert:jf,meshphysical_frag:Xf,meshtoon_vert:Kf,meshtoon_frag:Qf,points_vert:qf,points_frag:$f,shadow_vert:tp,shadow_frag:ep,sprite_vert:ip,sprite_frag:np},ht={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},ei={basic:{uniforms:Ce([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Lt.meshbasic_vert,fragmentShader:Lt.meshbasic_frag},lambert:{uniforms:Ce([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new St(0)}}]),vertexShader:Lt.meshlambert_vert,fragmentShader:Lt.meshlambert_frag},phong:{uniforms:Ce([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:Lt.meshphong_vert,fragmentShader:Lt.meshphong_frag},standard:{uniforms:Ce([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag},toon:{uniforms:Ce([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new St(0)}}]),vertexShader:Lt.meshtoon_vert,fragmentShader:Lt.meshtoon_frag},matcap:{uniforms:Ce([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Lt.meshmatcap_vert,fragmentShader:Lt.meshmatcap_frag},points:{uniforms:Ce([ht.points,ht.fog]),vertexShader:Lt.points_vert,fragmentShader:Lt.points_frag},dashed:{uniforms:Ce([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Lt.linedashed_vert,fragmentShader:Lt.linedashed_frag},depth:{uniforms:Ce([ht.common,ht.displacementmap]),vertexShader:Lt.depth_vert,fragmentShader:Lt.depth_frag},normal:{uniforms:Ce([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Lt.meshnormal_vert,fragmentShader:Lt.meshnormal_frag},sprite:{uniforms:Ce([ht.sprite,ht.fog]),vertexShader:Lt.sprite_vert,fragmentShader:Lt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Lt.background_vert,fragmentShader:Lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Lt.backgroundCube_vert,fragmentShader:Lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Lt.cube_vert,fragmentShader:Lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Lt.equirect_vert,fragmentShader:Lt.equirect_frag},distanceRGBA:{uniforms:Ce([ht.common,ht.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Lt.distanceRGBA_vert,fragmentShader:Lt.distanceRGBA_frag},shadow:{uniforms:Ce([ht.lights,ht.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:Lt.shadow_vert,fragmentShader:Lt.shadow_frag}};ei.physical={uniforms:Ce([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag};var ks={r:0,b:0,g:0},Wi=new Qe,sp=new ee;function rp(n,t,e,i,s,r,a){let o=new St(0),l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(b){let T=b.isScene===!0?b.background:null;return T&&T.isTexture&&(T=(b.backgroundBlurriness>0?e:t).get(T)),T}function y(b){let T=!1,E=g(b);E===null?d(o,l):E&&E.isColor&&(d(E,1),T=!0);let N=n.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,a):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,T){let E=g(T);E&&(E.isCubeTexture||E.mapping===wr)?(h===void 0&&(h=new Jt(new Je(1,1,1),new fe({name:"BackgroundCubeMaterial",uniforms:_n(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,_,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Wi.copy(T.backgroundRotation),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(sp.makeRotationFromEuler(Wi)),h.material.toneMapped=Vt.getTransfer(E.colorSpace)!==qt,(u!==E||f!==E.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=E,f=E.version,p=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Jt(new wn(2,2),new fe({name:"BackgroundMaterial",uniforms:_n(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Vt.getTransfer(E.colorSpace)!==qt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,f=E.version,p=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,T){b.getRGB(ks,qc(n)),i.buffers.color.setClear(ks.r,ks.g,ks.b,T,a)}return{getClearColor:function(){return o},setClearColor:function(b,T=1){o.set(b),l=T,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(o,l)},render:y,addToRenderList:m}}function ap(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,a=!1;function o(I,C,Z,z,V){let q=!1,J=u(z,Z,C);r!==J&&(r=J,c(r.object)),q=p(I,z,Z,V),q&&g(I,z,Z,V),V!==null&&t.update(V,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,E(I,C,Z,z),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function h(I){return n.deleteVertexArray(I)}function u(I,C,Z){let z=Z.wireframe===!0,V=i[I.id];V===void 0&&(V={},i[I.id]=V);let q=V[C.id];q===void 0&&(q={},V[C.id]=q);let J=q[z];return J===void 0&&(J=f(l()),q[z]=J),J}function f(I){let C=[],Z=[],z=[];for(let V=0;V<e;V++)C[V]=0,Z[V]=0,z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:Z,attributeDivisors:z,object:I,attributes:{},index:null}}function p(I,C,Z,z){let V=r.attributes,q=C.attributes,J=0,tt=Z.getAttributes();for(let B in tt)if(tt[B].location>=0){let xt=V[B],Rt=q[B];if(Rt===void 0&&(B==="instanceMatrix"&&I.instanceMatrix&&(Rt=I.instanceMatrix),B==="instanceColor"&&I.instanceColor&&(Rt=I.instanceColor)),xt===void 0||xt.attribute!==Rt||Rt&&xt.data!==Rt.data)return!0;J++}return r.attributesNum!==J||r.index!==z}function g(I,C,Z,z){let V={},q=C.attributes,J=0,tt=Z.getAttributes();for(let B in tt)if(tt[B].location>=0){let xt=q[B];xt===void 0&&(B==="instanceMatrix"&&I.instanceMatrix&&(xt=I.instanceMatrix),B==="instanceColor"&&I.instanceColor&&(xt=I.instanceColor));let Rt={};Rt.attribute=xt,xt&&xt.data&&(Rt.data=xt.data),V[B]=Rt,J++}r.attributes=V,r.attributesNum=J,r.index=z}function y(){let I=r.newAttributes;for(let C=0,Z=I.length;C<Z;C++)I[C]=0}function m(I){d(I,0)}function d(I,C){let Z=r.newAttributes,z=r.enabledAttributes,V=r.attributeDivisors;Z[I]=1,z[I]===0&&(n.enableVertexAttribArray(I),z[I]=1),V[I]!==C&&(n.vertexAttribDivisor(I,C),V[I]=C)}function b(){let I=r.newAttributes,C=r.enabledAttributes;for(let Z=0,z=C.length;Z<z;Z++)C[Z]!==I[Z]&&(n.disableVertexAttribArray(Z),C[Z]=0)}function T(I,C,Z,z,V,q,J){J===!0?n.vertexAttribIPointer(I,C,Z,V,q):n.vertexAttribPointer(I,C,Z,z,V,q)}function E(I,C,Z,z){y();let V=z.attributes,q=Z.getAttributes(),J=C.defaultAttributeValues;for(let tt in q){let B=q[tt];if(B.location>=0){let ut=V[tt];if(ut===void 0&&(tt==="instanceMatrix"&&I.instanceMatrix&&(ut=I.instanceMatrix),tt==="instanceColor"&&I.instanceColor&&(ut=I.instanceColor)),ut!==void 0){let xt=ut.normalized,Rt=ut.itemSize,Nt=t.get(ut);if(Nt===void 0)continue;let Ut=Nt.buffer,Y=Nt.type,nt=Nt.bytesPerElement,vt=Y===n.INT||Y===n.UNSIGNED_INT||ut.gpuType===rl;if(ut.isInterleavedBufferAttribute){let dt=ut.data,kt=dt.stride,Ht=ut.offset;if(dt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<B.locationSize;Ot++)d(B.location+Ot,dt.meshPerAttribute);I.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Ot=0;Ot<B.locationSize;Ot++)m(B.location+Ot);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let Ot=0;Ot<B.locationSize;Ot++)T(B.location+Ot,Rt/B.locationSize,Y,xt,kt*nt,(Ht+Rt/B.locationSize*Ot)*nt,vt)}else{if(ut.isInstancedBufferAttribute){for(let dt=0;dt<B.locationSize;dt++)d(B.location+dt,ut.meshPerAttribute);I.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let dt=0;dt<B.locationSize;dt++)m(B.location+dt);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let dt=0;dt<B.locationSize;dt++)T(B.location+dt,Rt/B.locationSize,Y,xt,Rt*nt,Rt/B.locationSize*dt*nt,vt)}}else if(J!==void 0){let xt=J[tt];if(xt!==void 0)switch(xt.length){case 2:n.vertexAttrib2fv(B.location,xt);break;case 3:n.vertexAttrib3fv(B.location,xt);break;case 4:n.vertexAttrib4fv(B.location,xt);break;default:n.vertexAttrib1fv(B.location,xt)}}}}b()}function N(){F();for(let I in i){let C=i[I];for(let Z in C){let z=C[Z];for(let V in z)h(z[V].object),delete z[V];delete C[Z]}delete i[I]}}function _(I){if(i[I.id]===void 0)return;let C=i[I.id];for(let Z in C){let z=C[Z];for(let V in z)h(z[V].object),delete z[V];delete C[Z]}delete i[I.id]}function w(I){for(let C in i){let Z=i[C];if(Z[I.id]===void 0)continue;let z=Z[I.id];for(let V in z)h(z[V].object),delete z[V];delete Z[I.id]}}function F(){M(),a=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:F,resetDefaultState:M,dispose:N,releaseStatesOfGeometry:_,releaseStatesOfProgram:w,initAttributes:y,enableAttribute:m,disableUnusedAttributes:b}}function op(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,f){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*f[y];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function lp(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==Ke&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let F=w===ze&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Ii&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ni&&!F)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,_=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:E,vertexTextures:N,maxSamples:_}}function cp(n){let t=this,e=null,i=0,s=!1,r=!1,a=new gi,o=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,d=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let b=r?0:i,T=b*4,E=d.clippingState||null;l.value=E,E=h(g,f,T,p);for(let N=0;N!==T;++N)E[N]=e[N];d.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,p,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let d=p+y*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let T=0,E=p;T!==y;++T,E+=4)a.copy(u[T]).applyMatrix4(b,o),a.normal.toArray(m,E),m[E+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function hp(n){let t=new WeakMap;function e(a,o){return o===ka?a.mapping=Tn:o===Ha&&(a.mapping=bn),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===ka||o===Ha)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new go(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Cn=class extends ar{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},xn=4,ec=[.125,.215,.35,.446,.526,.582],Yi=20,ua=new Cn,ic=new St,da=null,fa=0,pa=0,ma=!1,Zi=(1+Math.sqrt(5))/2,mn=1/Zi,nc=[new P(-Zi,mn,0),new P(Zi,mn,0),new P(-mn,0,Zi),new P(mn,0,Zi),new P(0,Zi,-mn),new P(0,Zi,mn),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],An=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(da,fa,pa),this._renderer.xr.enabled=ma,t.scissorTest=!1,Hs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Tn||t.mapping===bn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),da=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:ze,format:Ke,colorSpace:On,depthBuffer:!1},s=sc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sc(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=up(r)),this._blurMaterial=dp(r,t,e)}return s}_compileMaterial(t){let e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,ua)}_sceneToCubeUV(t,e,i,s){let o=new Pe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(ic),h.toneMapping=ri,h.autoClear=!1;let p=new oi({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),g=new Jt(new Je,p),y=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,y=!0):(p.color.copy(ic),y=!0);for(let d=0;d<6;d++){let b=d%3;b===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):b===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));let T=this._cubeSize;Hs(s,b*T,d>2?T:0,T,T),h.setRenderTarget(s),y&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Tn||t.mapping===bn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Jt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Hs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,ua)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=nc[(s-r-1)%nc.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Jt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Yi-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):Yi;m>Yi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yi}`);let d=[],b=0;for(let w=0;w<Yi;++w){let F=w/y,M=Math.exp(-F*F/2);d.push(M),w===0?b+=M:w<m&&(b+=2*M)}for(let w=0;w<d.length;w++)d[w]=d[w]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:T}=this;f.dTheta.value=g,f.mipInt.value=T-i;let E=this._sizeLods[s],N=3*E*(s>T-xn?s-T+xn:0),_=4*(this._cubeSize-E);Hs(e,N,_,3*E,2*E),l.setRenderTarget(e),l.render(u,ua)}};function up(n){let t=[],e=[],i=[],s=n,r=n-xn+1+ec.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>n-xn?l=ec[a-n+xn-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,y=3,m=2,d=1,b=new Float32Array(y*g*p),T=new Float32Array(m*g*p),E=new Float32Array(d*g*p);for(let _=0;_<p;_++){let w=_%3*2/3-1,F=_>2?0:-1,M=[w,F,0,w+2/3,F,0,w+2/3,F+1,0,w,F,0,w+2/3,F+1,0,w,F+1,0];b.set(M,y*g*_),T.set(f,m*g*_);let I=[_,_,_,_,_,_];E.set(I,d*g*_)}let N=new ve;N.setAttribute("position",new de(b,y)),N.setAttribute("uv",new de(T,m)),N.setAttribute("faceIndex",new de(E,d)),t.push(N),s>xn&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function sc(n,t,e){let i=new Ee(n,t,e);return i.texture.mapping=wr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function dp(n,t,e){let i=new Float32Array(Yi),s=new P(0,1,0);return new fe({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function rc(){return new fe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function ac(){return new fe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function fl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fp(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===ka||l===Ha,h=l===Tn||l===bn;if(c||h){let u=t.get(o),f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new An(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new An(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function pp(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&qn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function mp(n,t,e,i){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,d=y.length;m<d;m++)t.remove(y[m])}f.removeEventListener("dispose",a),delete s[f.id];let p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let g in f)t.update(f[g],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let y=p[g];for(let m=0,d=y.length;m<d;m++)t.update(y[m],n.ARRAY_BUFFER)}}function c(u){let f=[],p=u.index,g=u.attributes.position,y=0;if(p!==null){let b=p.array;y=p.version;for(let T=0,E=b.length;T<E;T+=3){let N=b[T+0],_=b[T+1],w=b[T+2];f.push(N,_,_,w,w,N)}}else if(g!==void 0){let b=g.array;y=g.version;for(let T=0,E=b.length/3-1;T<E;T+=3){let N=T+0,_=T+1,w=T+2;f.push(N,_,_,w,w,N)}}else return;let m=new(Kc(f)?rr:sr)(f,1);m.version=y;let d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function gp(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*a),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*a,g),e.update(p,i,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function u(f,p,g,y){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/a,p[d],y[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,y,0,g);let d=0;for(let b=0;b<g;b++)d+=p[b]*y[b];e.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function xp(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function yp(n,t,e){let i=new WeakMap,s=new te;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(o);if(f===void 0||f.count!==u){let M=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),y===!0&&(T=3);let E=o.attributes.position.count*T,N=1;E>t.maxTextureSize&&(N=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);let _=new Float32Array(E*N*4*u),w=new ir(_,E,N,u);w.type=ni,w.needsUpdate=!0;let F=T*4;for(let I=0;I<u;I++){let C=m[I],Z=d[I],z=b[I],V=E*N*4*I;for(let q=0;q<C.count;q++){let J=q*F;p===!0&&(s.fromBufferAttribute(C,q),_[V+J+0]=s.x,_[V+J+1]=s.y,_[V+J+2]=s.z,_[V+J+3]=0),g===!0&&(s.fromBufferAttribute(Z,q),_[V+J+4]=s.x,_[V+J+5]=s.y,_[V+J+6]=s.z,_[V+J+7]=0),y===!0&&(s.fromBufferAttribute(z,q),_[V+J+8]=s.x,_[V+J+9]=s.y,_[V+J+10]=s.z,_[V+J+11]=z.itemSize===4?s.w:1)}}f={count:u,texture:w,size:new Et(E,N)},i.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let p=0;for(let y=0;y<c.length;y++)p+=c[y];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Sp(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var lr=class extends Ge{constructor(t,e,i,s,r,a,o,l,c,h=Sn){if(h!==Sn&&h!==Pn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Sn&&(i=Ki),i===void 0&&h===Pn&&(i=Rn),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Oe,this.minFilter=l!==void 0?l:Oe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},th=new Ge,oc=new lr(1,1),eh=new ir,ih=new po,nh=new or,lc=[],cc=[],hc=new Float32Array(16),uc=new Float32Array(9),dc=new Float32Array(4);function Gn(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=lc[s];if(r===void 0&&(r=new Float32Array(s),lc[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function ge(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function xe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ar(n,t){let e=cc[t];e===void 0&&(e=new Int32Array(t),cc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Ip(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Ep(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;n.uniform2fv(this.addr,t),xe(e,t)}}function vp(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;n.uniform3fv(this.addr,t),xe(e,t)}}function Mp(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;n.uniform4fv(this.addr,t),xe(e,t)}}function Tp(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ge(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,i))return;dc.set(i),n.uniformMatrix2fv(this.addr,!1,dc),xe(e,i)}}function bp(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ge(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,i))return;uc.set(i),n.uniformMatrix3fv(this.addr,!1,uc),xe(e,i)}}function Rp(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ge(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ge(e,i))return;hc.set(i),n.uniformMatrix4fv(this.addr,!1,hc),xe(e,i)}}function Pp(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function _p(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;n.uniform2iv(this.addr,t),xe(e,t)}}function wp(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;n.uniform3iv(this.addr,t),xe(e,t)}}function Cp(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;n.uniform4iv(this.addr,t),xe(e,t)}}function Ap(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Up(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;n.uniform2uiv(this.addr,t),xe(e,t)}}function kp(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;n.uniform3uiv(this.addr,t),xe(e,t)}}function Hp(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;n.uniform4uiv(this.addr,t),xe(e,t)}}function Fp(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(oc.compareFunction=Xc,r=oc):r=th,e.setTexture2D(t||r,s)}function Np(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ih,s)}function Op(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||nh,s)}function Gp(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||eh,s)}function Dp(n){switch(n){case 5126:return Ip;case 35664:return Ep;case 35665:return vp;case 35666:return Mp;case 35674:return Tp;case 35675:return bp;case 35676:return Rp;case 5124:case 35670:return Pp;case 35667:case 35671:return _p;case 35668:case 35672:return wp;case 35669:case 35673:return Cp;case 5125:return Ap;case 36294:return Up;case 36295:return kp;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return Fp;case 35679:case 36299:case 36307:return Np;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Gp}}function zp(n,t){n.uniform1fv(this.addr,t)}function Bp(n,t){let e=Gn(t,this.size,2);n.uniform2fv(this.addr,e)}function Lp(n,t){let e=Gn(t,this.size,3);n.uniform3fv(this.addr,e)}function Wp(n,t){let e=Gn(t,this.size,4);n.uniform4fv(this.addr,e)}function Jp(n,t){let e=Gn(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Zp(n,t){let e=Gn(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Vp(n,t){let e=Gn(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Yp(n,t){n.uniform1iv(this.addr,t)}function jp(n,t){n.uniform2iv(this.addr,t)}function Xp(n,t){n.uniform3iv(this.addr,t)}function Kp(n,t){n.uniform4iv(this.addr,t)}function Qp(n,t){n.uniform1uiv(this.addr,t)}function qp(n,t){n.uniform2uiv(this.addr,t)}function $p(n,t){n.uniform3uiv(this.addr,t)}function tm(n,t){n.uniform4uiv(this.addr,t)}function em(n,t,e){let i=this.cache,s=t.length,r=Ar(e,s);ge(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||th,r[a])}function im(n,t,e){let i=this.cache,s=t.length,r=Ar(e,s);ge(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ih,r[a])}function nm(n,t,e){let i=this.cache,s=t.length,r=Ar(e,s);ge(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||nh,r[a])}function sm(n,t,e){let i=this.cache,s=t.length,r=Ar(e,s);ge(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||eh,r[a])}function rm(n){switch(n){case 5126:return zp;case 35664:return Bp;case 35665:return Lp;case 35666:return Wp;case 35674:return Jp;case 35675:return Zp;case 35676:return Vp;case 5124:case 35670:return Yp;case 35667:case 35671:return jp;case 35668:case 35672:return Xp;case 35669:case 35673:return Kp;case 5125:return Qp;case 36294:return qp;case 36295:return $p;case 36296:return tm;case 35678:case 36198:case 36298:case 36306:case 35682:return em;case 35679:case 36299:case 36307:return im;case 35680:case 36300:case 36308:case 36293:return nm;case 36289:case 36303:case 36311:case 36292:return sm}}var xo=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Dp(e.type)}},yo=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rm(e.type)}},So=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},ga=/(\w+)(\])?(\[|\.)?/g;function fc(n,t){n.seq.push(t),n.map[t.id]=t}function am(n,t,e){let i=n.name,s=i.length;for(ga.lastIndex=0;;){let r=ga.exec(i),a=ga.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){fc(e,c===void 0?new xo(o,n,t):new yo(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new So(o),fc(e,u)),e=u}}}var En=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);am(r,a,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function pc(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var om=37297,lm=0;function cm(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var mc=new zt;function hm(n){Vt._getMatrix(mc,Vt.workingColorSpace,n);let t=`mat3( ${mc.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(n)){case Cr:return[t,"LinearTransferOETF"];case qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function gc(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+cm(n.getShaderSource(t),a)}else return s}function um(n,t){let e=hm(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function dm(n,t){let e;switch(t){case $o:e="Linear";break;case tl:e="Reinhard";break;case el:e="Cineon";break;case il:e="ACESFilmic";break;case nl:e="AgX";break;case sl:e="Neutral";break;case Wh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Fs=new P;function fm(){Vt.getLuminanceCoefficients(Fs);let n=Fs.x.toFixed(4),t=Fs.y.toFixed(4),e=Fs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($n).join(`
`)}function mm(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function gm(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function $n(n){return n!==""}function xc(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function yc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Io(n){return n.replace(xm,Sm)}var ym=new Map;function Sm(n,t){let e=Lt[t];if(e===void 0){let i=ym.get(t);if(i!==void 0)e=Lt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Io(e)}var Im=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sc(n){return n.replace(Im,Em)}function Em(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ic(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function vm(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Gc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===vh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===mi&&(t="SHADOWMAP_TYPE_VSM"),t}function Mm(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Tn:case bn:t="ENVMAP_TYPE_CUBE";break;case wr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Tm(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case bn:t="ENVMAP_MODE_REFRACTION";break}return t}function bm(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case qo:t="ENVMAP_BLENDING_MULTIPLY";break;case Bh:t="ENVMAP_BLENDING_MIX";break;case Lh:t="ENVMAP_BLENDING_ADD";break}return t}function Rm(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Pm(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=vm(e),c=Mm(e),h=Tm(e),u=bm(e),f=Rm(e),p=pm(e),g=mm(r),y=s.createProgram(),m,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($n).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($n).join(`
`),d.length>0&&(d+=`
`)):(m=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($n).join(`
`),d=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?Lt.tonemapping_pars_fragment:"",e.toneMapping!==ri?dm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Lt.colorspace_pars_fragment,um("linearToOutputTexel",e.outputColorSpace),fm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($n).join(`
`)),a=Io(a),a=xc(a,e),a=yc(a,e),o=Io(o),o=xc(o,e),o=yc(o,e),a=Sc(a),o=Sc(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let T=b+m+a,E=b+d+o,N=pc(s,s.VERTEX_SHADER,T),_=pc(s,s.FRAGMENT_SHADER,E);s.attachShader(y,N),s.attachShader(y,_),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function w(C){if(n.debug.checkShaderErrors){let Z=s.getProgramInfoLog(y).trim(),z=s.getShaderInfoLog(N).trim(),V=s.getShaderInfoLog(_).trim(),q=!0,J=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,N,_);else{let tt=gc(s,N,"vertex"),B=gc(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+Z+`
`+tt+`
`+B)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(z===""||V==="")&&(J=!1);J&&(C.diagnostics={runnable:q,programLog:Z,vertexShader:{log:z,prefix:m},fragmentShader:{log:V,prefix:d}})}s.deleteShader(N),s.deleteShader(_),F=new En(s,y),M=gm(s,y)}let F;this.getUniforms=function(){return F===void 0&&w(this),F};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(y,om)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lm++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=_,this}var _m=0,Eo=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new vo(t),e.set(t,i)),i}},vo=class{constructor(t){this.id=_m++,this.code=t,this.usedTimes=0}};function wm(n,t,e,i,s,r,a){let o=new nr,l=new Eo,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,I,C,Z,z){let V=Z.fog,q=z.geometry,J=M.isMeshStandardMaterial?Z.environment:null,tt=(M.isMeshStandardMaterial?e:t).get(M.envMap||J),B=tt&&tt.mapping===wr?tt.image.height:null,ut=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let xt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Rt=xt!==void 0?xt.length:0,Nt=0;q.morphAttributes.position!==void 0&&(Nt=1),q.morphAttributes.normal!==void 0&&(Nt=2),q.morphAttributes.color!==void 0&&(Nt=3);let Ut,Y,nt,vt;if(ut){let $t=ei[ut];Ut=$t.vertexShader,Y=$t.fragmentShader}else Ut=M.vertexShader,Y=M.fragmentShader,l.update(M),nt=l.getVertexShaderID(M),vt=l.getFragmentShaderID(M);let dt=n.getRenderTarget(),kt=n.state.buffers.depth.getReversed(),Ht=z.isInstancedMesh===!0,Ot=z.isBatchedMesh===!0,ie=!!M.map,Zt=!!M.matcap,et=!!tt,R=!!M.aoMap,Mt=!!M.lightMap,Q=!!M.bumpMap,it=!!M.normalMap,$=!!M.displacementMap,Tt=!!M.emissiveMap,st=!!M.metalnessMap,v=!!M.roughnessMap,x=M.anisotropy>0,H=M.clearcoat>0,W=M.dispersion>0,j=M.iridescence>0,D=M.sheen>0,ct=M.transmission>0,at=x&&!!M.anisotropyMap,lt=H&&!!M.clearcoatMap,pt=H&&!!M.clearcoatNormalMap,X=H&&!!M.clearcoatRoughnessMap,ot=j&&!!M.iridescenceMap,bt=j&&!!M.iridescenceThicknessMap,At=D&&!!M.sheenColorMap,It=D&&!!M.sheenRoughnessMap,jt=!!M.specularMap,Bt=!!M.specularColorMap,ne=!!M.specularIntensityMap,A=ct&&!!M.transmissionMap,ft=ct&&!!M.thicknessMap,L=!!M.gradientMap,K=!!M.alphaMap,yt=M.alphaTest>0,mt=!!M.alphaHash,Gt=!!M.extensions,he=ri;M.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(he=n.toneMapping);let Te={shaderID:ut,shaderType:M.type,shaderName:M.name,vertexShader:Ut,fragmentShader:Y,defines:M.defines,customVertexShaderID:nt,customFragmentShaderID:vt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ot,batchingColor:Ot&&z._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&z.instanceColor!==null,instancingMorph:Ht&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:dt===null?n.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:On,alphaToCoverage:!!M.alphaToCoverage,map:ie,matcap:Zt,envMap:et,envMapMode:et&&tt.mapping,envMapCubeUVHeight:B,aoMap:R,lightMap:Mt,bumpMap:Q,normalMap:it,displacementMap:f&&$,emissiveMap:Tt,normalMapObjectSpace:it&&M.normalMapType===Yh,normalMapTangentSpace:it&&M.normalMapType===dl,metalnessMap:st,roughnessMap:v,anisotropy:x,anisotropyMap:at,clearcoat:H,clearcoatMap:lt,clearcoatNormalMap:pt,clearcoatRoughnessMap:X,dispersion:W,iridescence:j,iridescenceMap:ot,iridescenceThicknessMap:bt,sheen:D,sheenColorMap:At,sheenRoughnessMap:It,specularMap:jt,specularColorMap:Bt,specularIntensityMap:ne,transmission:ct,transmissionMap:A,thicknessMap:ft,gradientMap:L,opaque:M.transparent===!1&&M.blending===yn&&M.alphaToCoverage===!1,alphaMap:K,alphaTest:yt,alphaHash:mt,combine:M.combine,mapUv:ie&&y(M.map.channel),aoMapUv:R&&y(M.aoMap.channel),lightMapUv:Mt&&y(M.lightMap.channel),bumpMapUv:Q&&y(M.bumpMap.channel),normalMapUv:it&&y(M.normalMap.channel),displacementMapUv:$&&y(M.displacementMap.channel),emissiveMapUv:Tt&&y(M.emissiveMap.channel),metalnessMapUv:st&&y(M.metalnessMap.channel),roughnessMapUv:v&&y(M.roughnessMap.channel),anisotropyMapUv:at&&y(M.anisotropyMap.channel),clearcoatMapUv:lt&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:pt&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ot&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:At&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:It&&y(M.sheenRoughnessMap.channel),specularMapUv:jt&&y(M.specularMap.channel),specularColorMapUv:Bt&&y(M.specularColorMap.channel),specularIntensityMapUv:ne&&y(M.specularIntensityMap.channel),transmissionMapUv:A&&y(M.transmissionMap.channel),thicknessMapUv:ft&&y(M.thicknessMap.channel),alphaMapUv:K&&y(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(it||x),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!q.attributes.uv&&(ie||K),fog:!!V,useFog:M.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:kt,skinning:z.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Nt,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:he,decodeVideoTexture:ie&&M.map.isVideoTexture===!0&&Vt.getTransfer(M.map.colorSpace)===qt,decodeVideoTextureEmissive:Tt&&M.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(M.emissiveMap.colorSpace)===qt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===xi,flipSided:M.side===we,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Gt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&M.extensions.multiDraw===!0||Ot)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function d(M){let I=[];if(M.shaderID?I.push(M.shaderID):(I.push(M.customVertexShaderID),I.push(M.customFragmentShaderID)),M.defines!==void 0)for(let C in M.defines)I.push(C),I.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(b(I,M),T(I,M),I.push(n.outputColorSpace)),I.push(M.customProgramCacheKey),I.join()}function b(M,I){M.push(I.precision),M.push(I.outputColorSpace),M.push(I.envMapMode),M.push(I.envMapCubeUVHeight),M.push(I.mapUv),M.push(I.alphaMapUv),M.push(I.lightMapUv),M.push(I.aoMapUv),M.push(I.bumpMapUv),M.push(I.normalMapUv),M.push(I.displacementMapUv),M.push(I.emissiveMapUv),M.push(I.metalnessMapUv),M.push(I.roughnessMapUv),M.push(I.anisotropyMapUv),M.push(I.clearcoatMapUv),M.push(I.clearcoatNormalMapUv),M.push(I.clearcoatRoughnessMapUv),M.push(I.iridescenceMapUv),M.push(I.iridescenceThicknessMapUv),M.push(I.sheenColorMapUv),M.push(I.sheenRoughnessMapUv),M.push(I.specularMapUv),M.push(I.specularColorMapUv),M.push(I.specularIntensityMapUv),M.push(I.transmissionMapUv),M.push(I.thicknessMapUv),M.push(I.combine),M.push(I.fogExp2),M.push(I.sizeAttenuation),M.push(I.morphTargetsCount),M.push(I.morphAttributeCount),M.push(I.numDirLights),M.push(I.numPointLights),M.push(I.numSpotLights),M.push(I.numSpotLightMaps),M.push(I.numHemiLights),M.push(I.numRectAreaLights),M.push(I.numDirLightShadows),M.push(I.numPointLightShadows),M.push(I.numSpotLightShadows),M.push(I.numSpotLightShadowsWithMaps),M.push(I.numLightProbes),M.push(I.shadowMapType),M.push(I.toneMapping),M.push(I.numClippingPlanes),M.push(I.numClipIntersection),M.push(I.depthPacking)}function T(M,I){o.disableAll(),I.supportsVertexTextures&&o.enable(0),I.instancing&&o.enable(1),I.instancingColor&&o.enable(2),I.instancingMorph&&o.enable(3),I.matcap&&o.enable(4),I.envMap&&o.enable(5),I.normalMapObjectSpace&&o.enable(6),I.normalMapTangentSpace&&o.enable(7),I.clearcoat&&o.enable(8),I.iridescence&&o.enable(9),I.alphaTest&&o.enable(10),I.vertexColors&&o.enable(11),I.vertexAlphas&&o.enable(12),I.vertexUv1s&&o.enable(13),I.vertexUv2s&&o.enable(14),I.vertexUv3s&&o.enable(15),I.vertexTangents&&o.enable(16),I.anisotropy&&o.enable(17),I.alphaHash&&o.enable(18),I.batching&&o.enable(19),I.dispersion&&o.enable(20),I.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),I.fog&&o.enable(0),I.useFog&&o.enable(1),I.flatShading&&o.enable(2),I.logarithmicDepthBuffer&&o.enable(3),I.reverseDepthBuffer&&o.enable(4),I.skinning&&o.enable(5),I.morphTargets&&o.enable(6),I.morphNormals&&o.enable(7),I.morphColors&&o.enable(8),I.premultipliedAlpha&&o.enable(9),I.shadowMapEnabled&&o.enable(10),I.doubleSided&&o.enable(11),I.flipSided&&o.enable(12),I.useDepthPacking&&o.enable(13),I.dithering&&o.enable(14),I.transmission&&o.enable(15),I.sheen&&o.enable(16),I.opaque&&o.enable(17),I.pointsUvs&&o.enable(18),I.decodeVideoTexture&&o.enable(19),I.decodeVideoTextureEmissive&&o.enable(20),I.alphaToCoverage&&o.enable(21),M.push(o.mask)}function E(M){let I=g[M.type],C;if(I){let Z=ei[I];C=Ni.clone(Z.uniforms)}else C=M.uniforms;return C}function N(M,I){let C;for(let Z=0,z=h.length;Z<z;Z++){let V=h[Z];if(V.cacheKey===I){C=V,++C.usedTimes;break}}return C===void 0&&(C=new Pm(n,I,M,r),h.push(C)),C}function _(M){if(--M.usedTimes===0){let I=h.indexOf(M);h[I]=h[h.length-1],h.pop(),M.destroy()}}function w(M){l.remove(M)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:E,acquireProgram:N,releaseProgram:_,releaseShaderCache:w,programs:h,dispose:F}}function Cm(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Am(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Ec(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function vc(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,p,g,y,m){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},n[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=y,d.group=m),t++,d}function o(u,f,p,g,y,m){let d=a(u,f,p,g,y,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(u,f,p,g,y,m){let d=a(u,f,p,g,y,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||Am),i.length>1&&i.sort(f||Ec),s.length>1&&s.sort(f||Ec)}function h(){for(let u=t,f=n.length;u<f;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Um(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new vc,n.set(i,[a])):s>=r.length?(a=new vc,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function km(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new St};break;case"SpotLight":e={position:new P,direction:new P,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function Hm(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Fm=0;function Nm(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Om(n){let t=new km,e=Hm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let s=new P,r=new ee,a=new ee;function o(c){let h=0,u=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let p=0,g=0,y=0,m=0,d=0,b=0,T=0,E=0,N=0,_=0,w=0;c.sort(Nm);for(let M=0,I=c.length;M<I;M++){let C=c[M],Z=C.color,z=C.intensity,V=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=Z.r*z,u+=Z.g*z,f+=Z.b*z;else if(C.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(C.sh.coefficients[J],z);w++}else if(C.isDirectionalLight){let J=t.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let tt=C.shadow,B=e.get(C);B.shadowIntensity=tt.intensity,B.shadowBias=tt.bias,B.shadowNormalBias=tt.normalBias,B.shadowRadius=tt.radius,B.shadowMapSize=tt.mapSize,i.directionalShadow[p]=B,i.directionalShadowMap[p]=q,i.directionalShadowMatrix[p]=C.shadow.matrix,b++}i.directional[p]=J,p++}else if(C.isSpotLight){let J=t.get(C);J.position.setFromMatrixPosition(C.matrixWorld),J.color.copy(Z).multiplyScalar(z),J.distance=V,J.coneCos=Math.cos(C.angle),J.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),J.decay=C.decay,i.spot[y]=J;let tt=C.shadow;if(C.map&&(i.spotLightMap[N]=C.map,N++,tt.updateMatrices(C),C.castShadow&&_++),i.spotLightMatrix[y]=tt.matrix,C.castShadow){let B=e.get(C);B.shadowIntensity=tt.intensity,B.shadowBias=tt.bias,B.shadowNormalBias=tt.normalBias,B.shadowRadius=tt.radius,B.shadowMapSize=tt.mapSize,i.spotShadow[y]=B,i.spotShadowMap[y]=q,E++}y++}else if(C.isRectAreaLight){let J=t.get(C);J.color.copy(Z).multiplyScalar(z),J.halfWidth.set(C.width*.5,0,0),J.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=J,m++}else if(C.isPointLight){let J=t.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),J.distance=C.distance,J.decay=C.decay,C.castShadow){let tt=C.shadow,B=e.get(C);B.shadowIntensity=tt.intensity,B.shadowBias=tt.bias,B.shadowNormalBias=tt.normalBias,B.shadowRadius=tt.radius,B.shadowMapSize=tt.mapSize,B.shadowCameraNear=tt.camera.near,B.shadowCameraFar=tt.camera.far,i.pointShadow[g]=B,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=C.shadow.matrix,T++}i.point[g]=J,g++}else if(C.isHemisphereLight){let J=t.get(C);J.skyColor.copy(C.color).multiplyScalar(z),J.groundColor.copy(C.groundColor).multiplyScalar(z),i.hemi[d]=J,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let F=i.hash;(F.directionalLength!==p||F.pointLength!==g||F.spotLength!==y||F.rectAreaLength!==m||F.hemiLength!==d||F.numDirectionalShadows!==b||F.numPointShadows!==T||F.numSpotShadows!==E||F.numSpotMaps!==N||F.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=E+N-_,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=_,i.numLightProbes=w,F.directionalLength=p,F.pointLength=g,F.spotLength=y,F.rectAreaLength=m,F.hemiLength=d,F.numDirectionalShadows=b,F.numPointShadows=T,F.numSpotShadows=E,F.numSpotMaps=N,F.numLightProbes=w,i.version=Fm++)}function l(c,h){let u=0,f=0,p=0,g=0,y=0,m=h.matrixWorldInverse;for(let d=0,b=c.length;d<b;d++){let T=c[d];if(T.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),u++}else if(T.isSpotLight){let E=i.spot[p];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),p++}else if(T.isRectAreaLight){let E=i.rectArea[g];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(T.width*.5,0,0),E.halfHeight.set(0,T.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){let E=i.hemi[y];E.direction.setFromMatrixPosition(T.matrixWorld),E.direction.transformDirection(m),y++}}}return{setup:o,setupView:l,state:i}}function Mc(n){let t=new Om(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Gm(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Mc(n),t.set(s,[o])):r>=a.length?(o=new Mc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Mo=class extends ai{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Zh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},To=class extends ai{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Dm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Bm(n,t,e){let i=new rs,s=new Et,r=new Et,a=new te,o=new Mo({depthPacking:Vh}),l=new To,c={},h=e.maxTextureSize,u={[ki]:we,[we]:ki,[xi]:xi},f=new fe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Dm,fragmentShader:zm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new ve;g.setAttribute("position",new de(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Jt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gc;let d=this.type;this.render=function(_,w,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||_.length===0)return;let M=n.getRenderTarget(),I=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),Z=n.state;Z.setBlending(si),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let z=d!==mi&&this.type===mi,V=d===mi&&this.type!==mi;for(let q=0,J=_.length;q<J;q++){let tt=_[q],B=tt.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);let ut=B.getFrameExtents();if(s.multiply(ut),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ut.x),s.x=r.x*ut.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ut.y),s.y=r.y*ut.y,B.mapSize.y=r.y)),B.map===null||z===!0||V===!0){let Rt=this.type!==mi?{minFilter:Oe,magFilter:Oe}:{};B.map!==null&&B.map.dispose(),B.map=new Ee(s.x,s.y,Rt),B.map.texture.name=tt.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();let xt=B.getViewportCount();for(let Rt=0;Rt<xt;Rt++){let Nt=B.getViewport(Rt);a.set(r.x*Nt.x,r.y*Nt.y,r.x*Nt.z,r.y*Nt.w),Z.viewport(a),B.updateMatrices(tt,Rt),i=B.getFrustum(),E(w,F,B.camera,tt,this.type)}B.isPointLightShadow!==!0&&this.type===mi&&b(B,F),B.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(M,I,C)};function b(_,w){let F=t.update(y);f.defines.VSM_SAMPLES!==_.blurSamples&&(f.defines.VSM_SAMPLES=_.blurSamples,p.defines.VSM_SAMPLES=_.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new Ee(s.x,s.y)),f.uniforms.shadow_pass.value=_.map.texture,f.uniforms.resolution.value=_.mapSize,f.uniforms.radius.value=_.radius,n.setRenderTarget(_.mapPass),n.clear(),n.renderBufferDirect(w,null,F,f,y,null),p.uniforms.shadow_pass.value=_.mapPass.texture,p.uniforms.resolution.value=_.mapSize,p.uniforms.radius.value=_.radius,n.setRenderTarget(_.map),n.clear(),n.renderBufferDirect(w,null,F,p,y,null)}function T(_,w,F,M){let I=null,C=F.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(C!==void 0)I=C;else if(I=F.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let Z=I.uuid,z=w.uuid,V=c[Z];V===void 0&&(V={},c[Z]=V);let q=V[z];q===void 0&&(q=I.clone(),V[z]=q,w.addEventListener("dispose",N)),I=q}if(I.visible=w.visible,I.wireframe=w.wireframe,M===mi?I.side=w.shadowSide!==null?w.shadowSide:w.side:I.side=w.shadowSide!==null?w.shadowSide:u[w.side],I.alphaMap=w.alphaMap,I.alphaTest=w.alphaTest,I.map=w.map,I.clipShadows=w.clipShadows,I.clippingPlanes=w.clippingPlanes,I.clipIntersection=w.clipIntersection,I.displacementMap=w.displacementMap,I.displacementScale=w.displacementScale,I.displacementBias=w.displacementBias,I.wireframeLinewidth=w.wireframeLinewidth,I.linewidth=w.linewidth,F.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let Z=n.properties.get(I);Z.light=F}return I}function E(_,w,F,M,I){if(_.visible===!1)return;if(_.layers.test(w.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&I===mi)&&(!_.frustumCulled||i.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,_.matrixWorld);let z=t.update(_),V=_.material;if(Array.isArray(V)){let q=z.groups;for(let J=0,tt=q.length;J<tt;J++){let B=q[J],ut=V[B.materialIndex];if(ut&&ut.visible){let xt=T(_,ut,M,I);_.onBeforeShadow(n,_,w,F,z,xt,B),n.renderBufferDirect(F,null,z,xt,_,B),_.onAfterShadow(n,_,w,F,z,xt,B)}}}else if(V.visible){let q=T(_,V,M,I);_.onBeforeShadow(n,_,w,F,z,q,null),n.renderBufferDirect(F,null,z,q,_,null),_.onAfterShadow(n,_,w,F,z,q,null)}}let Z=_.children;for(let z=0,V=Z.length;z<V;z++)E(Z[z],w,F,M,I)}function N(_){_.target.removeEventListener("dispose",N);for(let F in c){let M=c[F],I=_.target.uuid;I in M&&(M[I].dispose(),delete M[I])}}}var Lm={[Ra]:Pa,[_a]:Aa,[wa]:Ua,[Mn]:Ca,[Pa]:Ra,[Aa]:_a,[Ua]:wa,[Ca]:Mn};function Wm(n,t){function e(){let A=!1,ft=new te,L=null,K=new te(0,0,0,0);return{setMask:function(yt){L!==yt&&!A&&(n.colorMask(yt,yt,yt,yt),L=yt)},setLocked:function(yt){A=yt},setClear:function(yt,mt,Gt,he,Te){Te===!0&&(yt*=he,mt*=he,Gt*=he),ft.set(yt,mt,Gt,he),K.equals(ft)===!1&&(n.clearColor(yt,mt,Gt,he),K.copy(ft))},reset:function(){A=!1,L=null,K.set(-1,0,0,0)}}}function i(){let A=!1,ft=!1,L=null,K=null,yt=null;return{setReversed:function(mt){if(ft!==mt){let Gt=t.get("EXT_clip_control");ft?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);let he=yt;yt=null,this.setClear(he)}ft=mt},getReversed:function(){return ft},setTest:function(mt){mt?dt(n.DEPTH_TEST):kt(n.DEPTH_TEST)},setMask:function(mt){L!==mt&&!A&&(n.depthMask(mt),L=mt)},setFunc:function(mt){if(ft&&(mt=Lm[mt]),K!==mt){switch(mt){case Ra:n.depthFunc(n.NEVER);break;case Pa:n.depthFunc(n.ALWAYS);break;case _a:n.depthFunc(n.LESS);break;case Mn:n.depthFunc(n.LEQUAL);break;case wa:n.depthFunc(n.EQUAL);break;case Ca:n.depthFunc(n.GEQUAL);break;case Aa:n.depthFunc(n.GREATER);break;case Ua:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=mt}},setLocked:function(mt){A=mt},setClear:function(mt){yt!==mt&&(ft&&(mt=1-mt),n.clearDepth(mt),yt=mt)},reset:function(){A=!1,L=null,K=null,yt=null,ft=!1}}}function s(){let A=!1,ft=null,L=null,K=null,yt=null,mt=null,Gt=null,he=null,Te=null;return{setTest:function($t){A||($t?dt(n.STENCIL_TEST):kt(n.STENCIL_TEST))},setMask:function($t){ft!==$t&&!A&&(n.stencilMask($t),ft=$t)},setFunc:function($t,Ze,li){(L!==$t||K!==Ze||yt!==li)&&(n.stencilFunc($t,Ze,li),L=$t,K=Ze,yt=li)},setOp:function($t,Ze,li){(mt!==$t||Gt!==Ze||he!==li)&&(n.stencilOp($t,Ze,li),mt=$t,Gt=Ze,he=li)},setLocked:function($t){A=$t},setClear:function($t){Te!==$t&&(n.clearStencil($t),Te=$t)},reset:function(){A=!1,ft=null,L=null,K=null,yt=null,mt=null,Gt=null,he=null,Te=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,b=null,T=null,E=null,N=null,_=null,w=new St(0,0,0),F=0,M=!1,I=null,C=null,Z=null,z=null,V=null,q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,tt=0,B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(B)[1]),J=tt>=1):B.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),J=tt>=2);let ut=null,xt={},Rt=n.getParameter(n.SCISSOR_BOX),Nt=n.getParameter(n.VIEWPORT),Ut=new te().fromArray(Rt),Y=new te().fromArray(Nt);function nt(A,ft,L,K){let yt=new Uint8Array(4),mt=n.createTexture();n.bindTexture(A,mt),n.texParameteri(A,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(A,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Gt=0;Gt<L;Gt++)A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,K,0,n.RGBA,n.UNSIGNED_BYTE,yt):n.texImage2D(ft+Gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,yt);return mt}let vt={};vt[n.TEXTURE_2D]=nt(n.TEXTURE_2D,n.TEXTURE_2D,1),vt[n.TEXTURE_CUBE_MAP]=nt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[n.TEXTURE_2D_ARRAY]=nt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),vt[n.TEXTURE_3D]=nt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),dt(n.DEPTH_TEST),a.setFunc(Mn),Q(!1),it(Rl),dt(n.CULL_FACE),R(si);function dt(A){h[A]!==!0&&(n.enable(A),h[A]=!0)}function kt(A){h[A]!==!1&&(n.disable(A),h[A]=!1)}function Ht(A,ft){return u[A]!==ft?(n.bindFramebuffer(A,ft),u[A]=ft,A===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ft),A===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function Ot(A,ft){let L=p,K=!1;if(A){L=f.get(ft),L===void 0&&(L=[],f.set(ft,L));let yt=A.textures;if(L.length!==yt.length||L[0]!==n.COLOR_ATTACHMENT0){for(let mt=0,Gt=yt.length;mt<Gt;mt++)L[mt]=n.COLOR_ATTACHMENT0+mt;L.length=yt.length,K=!0}}else L[0]!==n.BACK&&(L[0]=n.BACK,K=!0);K&&n.drawBuffers(L)}function ie(A){return g!==A?(n.useProgram(A),g=A,!0):!1}let Zt={[Vi]:n.FUNC_ADD,[Th]:n.FUNC_SUBTRACT,[bh]:n.FUNC_REVERSE_SUBTRACT};Zt[Rh]=n.MIN,Zt[Ph]=n.MAX;let et={[_h]:n.ZERO,[wh]:n.ONE,[Ch]:n.SRC_COLOR,[Ta]:n.SRC_ALPHA,[Nh]:n.SRC_ALPHA_SATURATE,[Hh]:n.DST_COLOR,[Uh]:n.DST_ALPHA,[Ah]:n.ONE_MINUS_SRC_COLOR,[ba]:n.ONE_MINUS_SRC_ALPHA,[Fh]:n.ONE_MINUS_DST_COLOR,[kh]:n.ONE_MINUS_DST_ALPHA,[Oh]:n.CONSTANT_COLOR,[Gh]:n.ONE_MINUS_CONSTANT_COLOR,[Dh]:n.CONSTANT_ALPHA,[zh]:n.ONE_MINUS_CONSTANT_ALPHA};function R(A,ft,L,K,yt,mt,Gt,he,Te,$t){if(A===si){y===!0&&(kt(n.BLEND),y=!1);return}if(y===!1&&(dt(n.BLEND),y=!0),A!==Mh){if(A!==m||$t!==M){if((d!==Vi||E!==Vi)&&(n.blendEquation(n.FUNC_ADD),d=Vi,E=Vi),$t)switch(A){case yn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vn:n.blendFunc(n.ONE,n.ONE);break;case Pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _l:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}else switch(A){case yn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _l:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}b=null,T=null,N=null,_=null,w.set(0,0,0),F=0,m=A,M=$t}return}yt=yt||ft,mt=mt||L,Gt=Gt||K,(ft!==d||yt!==E)&&(n.blendEquationSeparate(Zt[ft],Zt[yt]),d=ft,E=yt),(L!==b||K!==T||mt!==N||Gt!==_)&&(n.blendFuncSeparate(et[L],et[K],et[mt],et[Gt]),b=L,T=K,N=mt,_=Gt),(he.equals(w)===!1||Te!==F)&&(n.blendColor(he.r,he.g,he.b,Te),w.copy(he),F=Te),m=A,M=!1}function Mt(A,ft){A.side===xi?kt(n.CULL_FACE):dt(n.CULL_FACE);let L=A.side===we;ft&&(L=!L),Q(L),A.blending===yn&&A.transparent===!1?R(si):R(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.blendColor,A.blendAlpha,A.premultipliedAlpha),a.setFunc(A.depthFunc),a.setTest(A.depthTest),a.setMask(A.depthWrite),r.setMask(A.colorWrite);let K=A.stencilWrite;o.setTest(K),K&&(o.setMask(A.stencilWriteMask),o.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),o.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),Tt(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?dt(n.SAMPLE_ALPHA_TO_COVERAGE):kt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Q(A){I!==A&&(A?n.frontFace(n.CW):n.frontFace(n.CCW),I=A)}function it(A){A!==Ih?(dt(n.CULL_FACE),A!==C&&(A===Rl?n.cullFace(n.BACK):A===Eh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):kt(n.CULL_FACE),C=A}function $(A){A!==Z&&(J&&n.lineWidth(A),Z=A)}function Tt(A,ft,L){A?(dt(n.POLYGON_OFFSET_FILL),(z!==ft||V!==L)&&(n.polygonOffset(ft,L),z=ft,V=L)):kt(n.POLYGON_OFFSET_FILL)}function st(A){A?dt(n.SCISSOR_TEST):kt(n.SCISSOR_TEST)}function v(A){A===void 0&&(A=n.TEXTURE0+q-1),ut!==A&&(n.activeTexture(A),ut=A)}function x(A,ft,L){L===void 0&&(ut===null?L=n.TEXTURE0+q-1:L=ut);let K=xt[L];K===void 0&&(K={type:void 0,texture:void 0},xt[L]=K),(K.type!==A||K.texture!==ft)&&(ut!==L&&(n.activeTexture(L),ut=L),n.bindTexture(A,ft||vt[A]),K.type=A,K.texture=ft)}function H(){let A=xt[ut];A!==void 0&&A.type!==void 0&&(n.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function W(){try{n.compressedTexImage2D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function j(){try{n.compressedTexImage3D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function D(){try{n.texSubImage2D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ct(){try{n.texSubImage3D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function at(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function lt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function pt(){try{n.texStorage2D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function X(){try{n.texStorage3D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ot(){try{n.texImage2D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function bt(){try{n.texImage3D.apply(n,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function At(A){Ut.equals(A)===!1&&(n.scissor(A.x,A.y,A.z,A.w),Ut.copy(A))}function It(A){Y.equals(A)===!1&&(n.viewport(A.x,A.y,A.z,A.w),Y.copy(A))}function jt(A,ft){let L=c.get(ft);L===void 0&&(L=new WeakMap,c.set(ft,L));let K=L.get(A);K===void 0&&(K=n.getUniformBlockIndex(ft,A.name),L.set(A,K))}function Bt(A,ft){let K=c.get(ft).get(A);l.get(ft)!==K&&(n.uniformBlockBinding(ft,K,A.__bindingPointIndex),l.set(ft,K))}function ne(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ut=null,xt={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,b=null,T=null,E=null,N=null,_=null,w=new St(0,0,0),F=0,M=!1,I=null,C=null,Z=null,z=null,V=null,Ut.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:dt,disable:kt,bindFramebuffer:Ht,drawBuffers:Ot,useProgram:ie,setBlending:R,setMaterial:Mt,setFlipSided:Q,setCullFace:it,setLineWidth:$,setPolygonOffset:Tt,setScissorTest:st,activeTexture:v,bindTexture:x,unbindTexture:H,compressedTexImage2D:W,compressedTexImage3D:j,texImage2D:ot,texImage3D:bt,updateUBOMapping:jt,uniformBlockBinding:Bt,texStorage2D:pt,texStorage3D:X,texSubImage2D:D,texSubImage3D:ct,compressedTexSubImage2D:at,compressedTexSubImage3D:lt,scissor:At,viewport:It,reset:ne}}function Tc(n,t,e,i){let s=Jm(i);switch(e){case Wc:return n*t;case Zc:return n*t;case Vc:return n*t*2;case ll:return n*t/s.components*s.byteLength;case cl:return n*t/s.components*s.byteLength;case Yc:return n*t*2/s.components*s.byteLength;case hl:return n*t*2/s.components*s.byteLength;case Jc:return n*t*3/s.components*s.byteLength;case Ke:return n*t*4/s.components*s.byteLength;case ul:return n*t*4/s.components*s.byteLength;case Vs:case Ys:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case js:case Xs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ga:case za:return Math.max(n,16)*Math.max(t,8)/4;case Oa:case Da:return Math.max(n,8)*Math.max(t,8)/2;case Ba:case La:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Wa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ja:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Va:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ja:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case qa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case $a:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case to:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case eo:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case io:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case no:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ks:case so:case ro:return Math.ceil(n/4)*Math.ceil(t/4)*16;case jc:case ao:return Math.ceil(n/4)*Math.ceil(t/4)*8;case oo:case lo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jm(n){switch(n){case Ii:case zc:return{byteLength:1,components:1};case ns:case Bc:case ze:return{byteLength:2,components:1};case al:case ol:return{byteLength:2,components:4};case Ki:case rl:case ni:return{byteLength:4,components:1};case Lc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Zm(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(v,x){return p?new OffscreenCanvas(v,x):tr("canvas")}function y(v,x,H){let W=1,j=st(v);if((j.width>H||j.height>H)&&(W=H/Math.max(j.width,j.height)),W<1)if(typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&v instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&v instanceof ImageBitmap||typeof VideoFrame<"u"&&v instanceof VideoFrame){let D=Math.floor(W*j.width),ct=Math.floor(W*j.height);u===void 0&&(u=g(D,ct));let at=x?g(D,ct):u;return at.width=D,at.height=ct,at.getContext("2d").drawImage(v,0,0,D,ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+D+"x"+ct+")."),at}else return"data"in v&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),v;return v}function m(v){return v.generateMipmaps}function d(v){n.generateMipmap(v)}function b(v){return v.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:v.isWebGL3DRenderTarget?n.TEXTURE_3D:v.isWebGLArrayRenderTarget||v.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(v,x,H,W,j=!1){if(v!==null){if(n[v]!==void 0)return n[v];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+v+"'")}let D=x;if(x===n.RED&&(H===n.FLOAT&&(D=n.R32F),H===n.HALF_FLOAT&&(D=n.R16F),H===n.UNSIGNED_BYTE&&(D=n.R8)),x===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(D=n.R8UI),H===n.UNSIGNED_SHORT&&(D=n.R16UI),H===n.UNSIGNED_INT&&(D=n.R32UI),H===n.BYTE&&(D=n.R8I),H===n.SHORT&&(D=n.R16I),H===n.INT&&(D=n.R32I)),x===n.RG&&(H===n.FLOAT&&(D=n.RG32F),H===n.HALF_FLOAT&&(D=n.RG16F),H===n.UNSIGNED_BYTE&&(D=n.RG8)),x===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(D=n.RG8UI),H===n.UNSIGNED_SHORT&&(D=n.RG16UI),H===n.UNSIGNED_INT&&(D=n.RG32UI),H===n.BYTE&&(D=n.RG8I),H===n.SHORT&&(D=n.RG16I),H===n.INT&&(D=n.RG32I)),x===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(D=n.RGB8UI),H===n.UNSIGNED_SHORT&&(D=n.RGB16UI),H===n.UNSIGNED_INT&&(D=n.RGB32UI),H===n.BYTE&&(D=n.RGB8I),H===n.SHORT&&(D=n.RGB16I),H===n.INT&&(D=n.RGB32I)),x===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(D=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(D=n.RGBA16UI),H===n.UNSIGNED_INT&&(D=n.RGBA32UI),H===n.BYTE&&(D=n.RGBA8I),H===n.SHORT&&(D=n.RGBA16I),H===n.INT&&(D=n.RGBA32I)),x===n.RGB&&H===n.UNSIGNED_INT_5_9_9_9_REV&&(D=n.RGB9_E5),x===n.RGBA){let ct=j?Cr:Vt.getTransfer(W);H===n.FLOAT&&(D=n.RGBA32F),H===n.HALF_FLOAT&&(D=n.RGBA16F),H===n.UNSIGNED_BYTE&&(D=ct===qt?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(D=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(D=n.RGB5_A1)}return(D===n.R16F||D===n.R32F||D===n.RG16F||D===n.RG32F||D===n.RGBA16F||D===n.RGBA32F)&&t.get("EXT_color_buffer_float"),D}function E(v,x){let H;return v?x===null||x===Ki||x===Rn?H=n.DEPTH24_STENCIL8:x===ni?H=n.DEPTH32F_STENCIL8:x===ns&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ki||x===Rn?H=n.DEPTH_COMPONENT24:x===ni?H=n.DEPTH_COMPONENT32F:x===ns&&(H=n.DEPTH_COMPONENT16),H}function N(v,x){return m(v)===!0||v.isFramebufferTexture&&v.minFilter!==Oe&&v.minFilter!==ii?Math.log2(Math.max(x.width,x.height))+1:v.mipmaps!==void 0&&v.mipmaps.length>0?v.mipmaps.length:v.isCompressedTexture&&Array.isArray(v.image)?x.mipmaps.length:1}function _(v){let x=v.target;x.removeEventListener("dispose",_),F(x),x.isVideoTexture&&h.delete(x)}function w(v){let x=v.target;x.removeEventListener("dispose",w),I(x)}function F(v){let x=i.get(v);if(x.__webglInit===void 0)return;let H=v.source,W=f.get(H);if(W){let j=W[x.__cacheKey];j.usedTimes--,j.usedTimes===0&&M(v),Object.keys(W).length===0&&f.delete(H)}i.remove(v)}function M(v){let x=i.get(v);n.deleteTexture(x.__webglTexture);let H=v.source,W=f.get(H);delete W[x.__cacheKey],a.memory.textures--}function I(v){let x=i.get(v);if(v.depthTexture&&(v.depthTexture.dispose(),i.remove(v.depthTexture)),v.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let j=0;j<x.__webglFramebuffer[W].length;j++)n.deleteFramebuffer(x.__webglFramebuffer[W][j]);else n.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)n.deleteFramebuffer(x.__webglFramebuffer[W]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let H=v.textures;for(let W=0,j=H.length;W<j;W++){let D=i.get(H[W]);D.__webglTexture&&(n.deleteTexture(D.__webglTexture),a.memory.textures--),i.remove(H[W])}i.remove(v)}let C=0;function Z(){C=0}function z(){let v=C;return v>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+v+" texture units while this GPU supports only "+s.maxTextures),C+=1,v}function V(v){let x=[];return x.push(v.wrapS),x.push(v.wrapT),x.push(v.wrapR||0),x.push(v.magFilter),x.push(v.minFilter),x.push(v.anisotropy),x.push(v.internalFormat),x.push(v.format),x.push(v.type),x.push(v.generateMipmaps),x.push(v.premultiplyAlpha),x.push(v.flipY),x.push(v.unpackAlignment),x.push(v.colorSpace),x.join()}function q(v,x){let H=i.get(v);if(v.isVideoTexture&&$(v),v.isRenderTargetTexture===!1&&v.version>0&&H.__version!==v.version){let W=v.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(H,v,x);return}}e.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+x)}function J(v,x){let H=i.get(v);if(v.version>0&&H.__version!==v.version){Y(H,v,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+x)}function tt(v,x){let H=i.get(v);if(v.version>0&&H.__version!==v.version){Y(H,v,x);return}e.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+x)}function B(v,x){let H=i.get(v);if(v.version>0&&H.__version!==v.version){nt(H,v,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+x)}let ut={[Fa]:n.REPEAT,[ji]:n.CLAMP_TO_EDGE,[Na]:n.MIRRORED_REPEAT},xt={[Oe]:n.NEAREST,[Jh]:n.NEAREST_MIPMAP_NEAREST,[ms]:n.NEAREST_MIPMAP_LINEAR,[ii]:n.LINEAR,[Lr]:n.LINEAR_MIPMAP_NEAREST,[Xi]:n.LINEAR_MIPMAP_LINEAR},Rt={[jh]:n.NEVER,[tu]:n.ALWAYS,[Xh]:n.LESS,[Xc]:n.LEQUAL,[Kh]:n.EQUAL,[$h]:n.GEQUAL,[Qh]:n.GREATER,[qh]:n.NOTEQUAL};function Nt(v,x){if(x.type===ni&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===ii||x.magFilter===Lr||x.magFilter===ms||x.magFilter===Xi||x.minFilter===ii||x.minFilter===Lr||x.minFilter===ms||x.minFilter===Xi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(v,n.TEXTURE_WRAP_S,ut[x.wrapS]),n.texParameteri(v,n.TEXTURE_WRAP_T,ut[x.wrapT]),(v===n.TEXTURE_3D||v===n.TEXTURE_2D_ARRAY)&&n.texParameteri(v,n.TEXTURE_WRAP_R,ut[x.wrapR]),n.texParameteri(v,n.TEXTURE_MAG_FILTER,xt[x.magFilter]),n.texParameteri(v,n.TEXTURE_MIN_FILTER,xt[x.minFilter]),x.compareFunction&&(n.texParameteri(v,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(v,n.TEXTURE_COMPARE_FUNC,Rt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Oe||x.minFilter!==ms&&x.minFilter!==Xi||x.type===ni&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");n.texParameterf(v,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Ut(v,x){let H=!1;v.__webglInit===void 0&&(v.__webglInit=!0,x.addEventListener("dispose",_));let W=x.source,j=f.get(W);j===void 0&&(j={},f.set(W,j));let D=V(x);if(D!==v.__cacheKey){j[D]===void 0&&(j[D]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),j[D].usedTimes++;let ct=j[v.__cacheKey];ct!==void 0&&(j[v.__cacheKey].usedTimes--,ct.usedTimes===0&&M(x)),v.__cacheKey=D,v.__webglTexture=j[D].texture}return H}function Y(v,x,H){let W=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=n.TEXTURE_3D);let j=Ut(v,x),D=x.source;e.bindTexture(W,v.__webglTexture,n.TEXTURE0+H);let ct=i.get(D);if(D.version!==ct.__version||j===!0){e.activeTexture(n.TEXTURE0+H);let at=Vt.getPrimaries(Vt.workingColorSpace),lt=x.colorSpace===Ai?null:Vt.getPrimaries(x.colorSpace),pt=x.colorSpace===Ai||at===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);let X=y(x.image,!1,s.maxTextureSize);X=Tt(x,X);let ot=r.convert(x.format,x.colorSpace),bt=r.convert(x.type),At=T(x.internalFormat,ot,bt,x.colorSpace,x.isVideoTexture);Nt(W,x);let It,jt=x.mipmaps,Bt=x.isVideoTexture!==!0,ne=ct.__version===void 0||j===!0,A=D.dataReady,ft=N(x,X);if(x.isDepthTexture)At=E(x.format===Pn,x.type),ne&&(Bt?e.texStorage2D(n.TEXTURE_2D,1,At,X.width,X.height):e.texImage2D(n.TEXTURE_2D,0,At,X.width,X.height,0,ot,bt,null));else if(x.isDataTexture)if(jt.length>0){Bt&&ne&&e.texStorage2D(n.TEXTURE_2D,ft,At,jt[0].width,jt[0].height);for(let L=0,K=jt.length;L<K;L++)It=jt[L],Bt?A&&e.texSubImage2D(n.TEXTURE_2D,L,0,0,It.width,It.height,ot,bt,It.data):e.texImage2D(n.TEXTURE_2D,L,At,It.width,It.height,0,ot,bt,It.data);x.generateMipmaps=!1}else Bt?(ne&&e.texStorage2D(n.TEXTURE_2D,ft,At,X.width,X.height),A&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,X.width,X.height,ot,bt,X.data)):e.texImage2D(n.TEXTURE_2D,0,At,X.width,X.height,0,ot,bt,X.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Bt&&ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,At,jt[0].width,jt[0].height,X.depth);for(let L=0,K=jt.length;L<K;L++)if(It=jt[L],x.format!==Ke)if(ot!==null)if(Bt){if(A)if(x.layerUpdates.size>0){let yt=Tc(It.width,It.height,x.format,x.type);for(let mt of x.layerUpdates){let Gt=It.data.subarray(mt*yt/It.data.BYTES_PER_ELEMENT,(mt+1)*yt/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,L,0,0,mt,It.width,It.height,1,ot,Gt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,L,0,0,0,It.width,It.height,X.depth,ot,It.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,L,At,It.width,It.height,X.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?A&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,L,0,0,0,It.width,It.height,X.depth,ot,bt,It.data):e.texImage3D(n.TEXTURE_2D_ARRAY,L,At,It.width,It.height,X.depth,0,ot,bt,It.data)}else{Bt&&ne&&e.texStorage2D(n.TEXTURE_2D,ft,At,jt[0].width,jt[0].height);for(let L=0,K=jt.length;L<K;L++)It=jt[L],x.format!==Ke?ot!==null?Bt?A&&e.compressedTexSubImage2D(n.TEXTURE_2D,L,0,0,It.width,It.height,ot,It.data):e.compressedTexImage2D(n.TEXTURE_2D,L,At,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?A&&e.texSubImage2D(n.TEXTURE_2D,L,0,0,It.width,It.height,ot,bt,It.data):e.texImage2D(n.TEXTURE_2D,L,At,It.width,It.height,0,ot,bt,It.data)}else if(x.isDataArrayTexture)if(Bt){if(ne&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,At,X.width,X.height,X.depth),A)if(x.layerUpdates.size>0){let L=Tc(X.width,X.height,x.format,x.type);for(let K of x.layerUpdates){let yt=X.data.subarray(K*L/X.data.BYTES_PER_ELEMENT,(K+1)*L/X.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,K,X.width,X.height,1,ot,bt,yt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,ot,bt,X.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,At,X.width,X.height,X.depth,0,ot,bt,X.data);else if(x.isData3DTexture)Bt?(ne&&e.texStorage3D(n.TEXTURE_3D,ft,At,X.width,X.height,X.depth),A&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,ot,bt,X.data)):e.texImage3D(n.TEXTURE_3D,0,At,X.width,X.height,X.depth,0,ot,bt,X.data);else if(x.isFramebufferTexture){if(ne)if(Bt)e.texStorage2D(n.TEXTURE_2D,ft,At,X.width,X.height);else{let L=X.width,K=X.height;for(let yt=0;yt<ft;yt++)e.texImage2D(n.TEXTURE_2D,yt,At,L,K,0,ot,bt,null),L>>=1,K>>=1}}else if(jt.length>0){if(Bt&&ne){let L=st(jt[0]);e.texStorage2D(n.TEXTURE_2D,ft,At,L.width,L.height)}for(let L=0,K=jt.length;L<K;L++)It=jt[L],Bt?A&&e.texSubImage2D(n.TEXTURE_2D,L,0,0,ot,bt,It):e.texImage2D(n.TEXTURE_2D,L,At,ot,bt,It);x.generateMipmaps=!1}else if(Bt){if(ne){let L=st(X);e.texStorage2D(n.TEXTURE_2D,ft,At,L.width,L.height)}A&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ot,bt,X)}else e.texImage2D(n.TEXTURE_2D,0,At,ot,bt,X);m(x)&&d(W),ct.__version=D.version,x.onUpdate&&x.onUpdate(x)}v.__version=x.version}function nt(v,x,H){if(x.image.length!==6)return;let W=Ut(v,x),j=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,v.__webglTexture,n.TEXTURE0+H);let D=i.get(j);if(j.version!==D.__version||W===!0){e.activeTexture(n.TEXTURE0+H);let ct=Vt.getPrimaries(Vt.workingColorSpace),at=x.colorSpace===Ai?null:Vt.getPrimaries(x.colorSpace),lt=x.colorSpace===Ai||ct===at?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);let pt=x.isCompressedTexture||x.image[0].isCompressedTexture,X=x.image[0]&&x.image[0].isDataTexture,ot=[];for(let K=0;K<6;K++)!pt&&!X?ot[K]=y(x.image[K],!0,s.maxCubemapSize):ot[K]=X?x.image[K].image:x.image[K],ot[K]=Tt(x,ot[K]);let bt=ot[0],At=r.convert(x.format,x.colorSpace),It=r.convert(x.type),jt=T(x.internalFormat,At,It,x.colorSpace),Bt=x.isVideoTexture!==!0,ne=D.__version===void 0||W===!0,A=j.dataReady,ft=N(x,bt);Nt(n.TEXTURE_CUBE_MAP,x);let L;if(pt){Bt&&ne&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,jt,bt.width,bt.height);for(let K=0;K<6;K++){L=ot[K].mipmaps;for(let yt=0;yt<L.length;yt++){let mt=L[yt];x.format!==Ke?At!==null?Bt?A&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,mt.width,mt.height,At,mt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,jt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?A&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,mt.width,mt.height,At,It,mt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,jt,mt.width,mt.height,0,At,It,mt.data)}}}else{if(L=x.mipmaps,Bt&&ne){L.length>0&&ft++;let K=st(ot[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,jt,K.width,K.height)}for(let K=0;K<6;K++)if(X){Bt?A&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ot[K].width,ot[K].height,At,It,ot[K].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,jt,ot[K].width,ot[K].height,0,At,It,ot[K].data);for(let yt=0;yt<L.length;yt++){let Gt=L[yt].image[K].image;Bt?A&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,Gt.width,Gt.height,At,It,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,jt,Gt.width,Gt.height,0,At,It,Gt.data)}}else{Bt?A&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,At,It,ot[K]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,jt,At,It,ot[K]);for(let yt=0;yt<L.length;yt++){let mt=L[yt];Bt?A&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,At,It,mt.image[K]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,jt,At,It,mt.image[K])}}}m(x)&&d(n.TEXTURE_CUBE_MAP),D.__version=j.version,x.onUpdate&&x.onUpdate(x)}v.__version=x.version}function vt(v,x,H,W,j,D){let ct=r.convert(H.format,H.colorSpace),at=r.convert(H.type),lt=T(H.internalFormat,ct,at,H.colorSpace),pt=i.get(x),X=i.get(H);if(X.__renderTarget=x,!pt.__hasExternalTextures){let ot=Math.max(1,x.width>>D),bt=Math.max(1,x.height>>D);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?e.texImage3D(j,D,lt,ot,bt,x.depth,0,ct,at,null):e.texImage2D(j,D,lt,ot,bt,0,ct,at,null)}e.bindFramebuffer(n.FRAMEBUFFER,v),it(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,j,X.__webglTexture,0,Q(x)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,j,X.__webglTexture,D),e.bindFramebuffer(n.FRAMEBUFFER,null)}function dt(v,x,H){if(n.bindRenderbuffer(n.RENDERBUFFER,v),x.depthBuffer){let W=x.depthTexture,j=W&&W.isDepthTexture?W.type:null,D=E(x.stencilBuffer,j),ct=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=Q(x);it(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,D,x.width,x.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,at,D,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,D,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,v)}else{let W=x.textures;for(let j=0;j<W.length;j++){let D=W[j],ct=r.convert(D.format,D.colorSpace),at=r.convert(D.type),lt=T(D.internalFormat,ct,at,D.colorSpace),pt=Q(x);H&&it(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,lt,x.width,x.height):it(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,lt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,lt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function kt(v,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,v),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=i.get(x.depthTexture);W.__renderTarget=x,(!W.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),q(x.depthTexture,0);let j=W.__webglTexture,D=Q(x);if(x.depthTexture.format===Sn)it(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,D):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(x.depthTexture.format===Pn)it(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,D):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ht(v){let x=i.get(v),H=v.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==v.depthTexture){let W=v.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){let j=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",j)};W.addEventListener("dispose",j),x.__depthDisposeCallback=j}x.__boundDepthTexture=W}if(v.depthTexture&&!x.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");kt(x.__webglFramebuffer,v)}else if(H){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=n.createRenderbuffer(),dt(x.__webglDepthbuffer[W],v,!1);else{let j=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,D=x.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,D),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,D)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),dt(x.__webglDepthbuffer,v,!1);else{let W=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,j)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ot(v,x,H){let W=i.get(v);x!==void 0&&vt(W.__webglFramebuffer,v,v.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Ht(v)}function ie(v){let x=v.texture,H=i.get(v),W=i.get(x);v.addEventListener("dispose",w);let j=v.textures,D=v.isWebGLCubeRenderTarget===!0,ct=j.length>1;if(ct||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=x.version,a.memory.textures++),D){H.__webglFramebuffer=[];for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer[at]=[];for(let lt=0;lt<x.mipmaps.length;lt++)H.__webglFramebuffer[at][lt]=n.createFramebuffer()}else H.__webglFramebuffer[at]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer=[];for(let at=0;at<x.mipmaps.length;at++)H.__webglFramebuffer[at]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(ct)for(let at=0,lt=j.length;at<lt;at++){let pt=i.get(j[at]);pt.__webglTexture===void 0&&(pt.__webglTexture=n.createTexture(),a.memory.textures++)}if(v.samples>0&&it(v)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let at=0;at<j.length;at++){let lt=j[at];H.__webglColorRenderbuffer[at]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[at]);let pt=r.convert(lt.format,lt.colorSpace),X=r.convert(lt.type),ot=T(lt.internalFormat,pt,X,lt.colorSpace,v.isXRRenderTarget===!0),bt=Q(v);n.renderbufferStorageMultisample(n.RENDERBUFFER,bt,ot,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,H.__webglColorRenderbuffer[at])}n.bindRenderbuffer(n.RENDERBUFFER,null),v.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),dt(H.__webglDepthRenderbuffer,v,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(D){e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Nt(n.TEXTURE_CUBE_MAP,x);for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0)for(let lt=0;lt<x.mipmaps.length;lt++)vt(H.__webglFramebuffer[at][lt],v,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,lt);else vt(H.__webglFramebuffer[at],v,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(x)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let at=0,lt=j.length;at<lt;at++){let pt=j[at],X=i.get(pt);e.bindTexture(n.TEXTURE_2D,X.__webglTexture),Nt(n.TEXTURE_2D,pt),vt(H.__webglFramebuffer,v,pt,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,0),m(pt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let at=n.TEXTURE_2D;if((v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(at=v.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(at,W.__webglTexture),Nt(at,x),x.mipmaps&&x.mipmaps.length>0)for(let lt=0;lt<x.mipmaps.length;lt++)vt(H.__webglFramebuffer[lt],v,x,n.COLOR_ATTACHMENT0,at,lt);else vt(H.__webglFramebuffer,v,x,n.COLOR_ATTACHMENT0,at,0);m(x)&&d(at),e.unbindTexture()}v.depthBuffer&&Ht(v)}function Zt(v){let x=v.textures;for(let H=0,W=x.length;H<W;H++){let j=x[H];if(m(j)){let D=b(v),ct=i.get(j).__webglTexture;e.bindTexture(D,ct),d(D),e.unbindTexture()}}}let et=[],R=[];function Mt(v){if(v.samples>0){if(it(v)===!1){let x=v.textures,H=v.width,W=v.height,j=n.COLOR_BUFFER_BIT,D=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=i.get(v),at=x.length>1;if(at)for(let lt=0;lt<x.length;lt++)e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let lt=0;lt<x.length;lt++){if(v.resolveDepthBuffer&&(v.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),v.stencilBuffer&&v.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),at){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ct.__webglColorRenderbuffer[lt]);let pt=i.get(x[lt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pt,0)}n.blitFramebuffer(0,0,H,W,0,0,H,W,j,n.NEAREST),l===!0&&(et.length=0,R.length=0,et.push(n.COLOR_ATTACHMENT0+lt),v.depthBuffer&&v.resolveDepthBuffer===!1&&(et.push(D),R.push(D),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,R)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),at)for(let lt=0;lt<x.length;lt++){e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,ct.__webglColorRenderbuffer[lt]);let pt=i.get(x[lt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,pt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(v.depthBuffer&&v.resolveDepthBuffer===!1&&l){let x=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Q(v){return Math.min(s.maxSamples,v.samples)}function it(v){let x=i.get(v);return v.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function $(v){let x=a.render.frame;h.get(v)!==x&&(h.set(v,x),v.update())}function Tt(v,x){let H=v.colorSpace,W=v.format,j=v.type;return v.isCompressedTexture===!0||v.isVideoTexture===!0||H!==On&&H!==Ai&&(Vt.getTransfer(H)===qt?(W!==Ke||j!==Ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),x}function st(v){return typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement?(c.width=v.naturalWidth||v.width,c.height=v.naturalHeight||v.height):typeof VideoFrame<"u"&&v instanceof VideoFrame?(c.width=v.displayWidth,c.height=v.displayHeight):(c.width=v.width,c.height=v.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=Z,this.setTexture2D=q,this.setTexture2DArray=J,this.setTexture3D=tt,this.setTextureCube=B,this.rebindTextures=Ot,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=it}function Vm(n,t){function e(i,s=Ai){let r,a=Vt.getTransfer(s);if(i===Ii)return n.UNSIGNED_BYTE;if(i===al)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ol)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Lc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===zc)return n.BYTE;if(i===Bc)return n.SHORT;if(i===ns)return n.UNSIGNED_SHORT;if(i===rl)return n.INT;if(i===Ki)return n.UNSIGNED_INT;if(i===ni)return n.FLOAT;if(i===ze)return n.HALF_FLOAT;if(i===Wc)return n.ALPHA;if(i===Jc)return n.RGB;if(i===Ke)return n.RGBA;if(i===Zc)return n.LUMINANCE;if(i===Vc)return n.LUMINANCE_ALPHA;if(i===Sn)return n.DEPTH_COMPONENT;if(i===Pn)return n.DEPTH_STENCIL;if(i===ll)return n.RED;if(i===cl)return n.RED_INTEGER;if(i===Yc)return n.RG;if(i===hl)return n.RG_INTEGER;if(i===ul)return n.RGBA_INTEGER;if(i===Vs||i===Ys||i===js||i===Xs)if(a===qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Vs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Vs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ys)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oa||i===Ga||i===Da||i===za)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Oa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ga)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ba||i===La||i===Wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ba||i===La)return a===qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Wa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ja||i===Za||i===Va||i===Ya||i===ja||i===Xa||i===Ka||i===Qa||i===qa||i===$a||i===to||i===eo||i===io||i===no)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ja)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Za)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Va)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ya)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ja)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ka)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Qa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===qa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$a)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===to)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===eo)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===io)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===no)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ks||i===so||i===ro)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ks)return a===qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===so)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ro)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===jc||i===ao||i===oo||i===lo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ks)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ao)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Rn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var bo=class extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},_e=class extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ym={type:"move"},ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,i),d=this._getHandJoint(c,y);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ym)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new _e;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},jm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ro=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new Ge,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new fe({vertexShader:jm,fragmentShader:Xm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Po=class extends Hi{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null,y=new Ro,m=e.getContextAttributes(),d=null,b=null,T=[],E=[],N=new Et,_=null,w=new Pe;w.viewport=new te;let F=new Pe;F.viewport=new te;let M=[w,F],I=new bo,C=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let nt=T[Y];return nt===void 0&&(nt=new ts,T[Y]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Y){let nt=T[Y];return nt===void 0&&(nt=new ts,T[Y]=nt),nt.getGripSpace()},this.getHand=function(Y){let nt=T[Y];return nt===void 0&&(nt=new ts,T[Y]=nt),nt.getHandSpace()};function z(Y){let nt=E.indexOf(Y.inputSource);if(nt===-1)return;let vt=T[nt];vt!==void 0&&(vt.update(Y.inputSource,Y.frame,c||a),vt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",q);for(let Y=0;Y<T.length;Y++){let nt=E[Y];nt!==null&&(E[Y]=null,T[Y].disconnect(nt))}C=null,Z=null,y.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,b=null,Ut.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){let nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Ee(p.framebufferWidth,p.framebufferHeight,{format:Ke,type:Ii,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,vt=null,dt=null;m.depth&&(dt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?Pn:Sn,vt=m.stencil?Rn:Ki);let kt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(kt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new Ee(f.textureWidth,f.textureHeight,{format:Ke,type:Ii,depthTexture:new lr(f.textureWidth,f.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ut.setContext(s),Ut.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function q(Y){for(let nt=0;nt<Y.removed.length;nt++){let vt=Y.removed[nt],dt=E.indexOf(vt);dt>=0&&(E[dt]=null,T[dt].disconnect(vt))}for(let nt=0;nt<Y.added.length;nt++){let vt=Y.added[nt],dt=E.indexOf(vt);if(dt===-1){for(let Ht=0;Ht<T.length;Ht++)if(Ht>=E.length){E.push(vt),dt=Ht;break}else if(E[Ht]===null){E[Ht]=vt,dt=Ht;break}if(dt===-1)break}let kt=T[dt];kt&&kt.connect(vt)}}let J=new P,tt=new P;function B(Y,nt,vt){J.setFromMatrixPosition(nt.matrixWorld),tt.setFromMatrixPosition(vt.matrixWorld);let dt=J.distanceTo(tt),kt=nt.projectionMatrix.elements,Ht=vt.projectionMatrix.elements,Ot=kt[14]/(kt[10]-1),ie=kt[14]/(kt[10]+1),Zt=(kt[9]+1)/kt[5],et=(kt[9]-1)/kt[5],R=(kt[8]-1)/kt[0],Mt=(Ht[8]+1)/Ht[0],Q=Ot*R,it=Ot*Mt,$=dt/(-R+Mt),Tt=$*-R;if(nt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Tt),Y.translateZ($),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),kt[10]===-1)Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let st=Ot+$,v=ie+$,x=Q-Tt,H=it+(dt-Tt),W=Zt*ie/v*st,j=et*ie/v*st;Y.projectionMatrix.makePerspective(x,H,W,j,st,v),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ut(Y,nt){nt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(nt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let nt=Y.near,vt=Y.far;y.texture!==null&&(y.depthNear>0&&(nt=y.depthNear),y.depthFar>0&&(vt=y.depthFar)),I.near=F.near=w.near=nt,I.far=F.far=w.far=vt,(C!==I.near||Z!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),C=I.near,Z=I.far),w.layers.mask=Y.layers.mask|2,F.layers.mask=Y.layers.mask|4,I.layers.mask=w.layers.mask|F.layers.mask;let dt=Y.parent,kt=I.cameras;ut(I,dt);for(let Ht=0;Ht<kt.length;Ht++)ut(kt[Ht],dt);kt.length===2?B(I,w,F):I.projectionMatrix.copy(w.projectionMatrix),xt(Y,I,dt)};function xt(Y,nt,vt){vt===null?Y.matrix.copy(nt.matrixWorld):(Y.matrix.copy(vt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(nt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ho*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(I)};let Rt=null;function Nt(Y,nt){if(h=nt.getViewerPose(c||a),g=nt,h!==null){let vt=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let dt=!1;vt.length!==I.cameras.length&&(I.cameras.length=0,dt=!0);for(let Ht=0;Ht<vt.length;Ht++){let Ot=vt[Ht],ie=null;if(p!==null)ie=p.getViewport(Ot);else{let et=u.getViewSubImage(f,Ot);ie=et.viewport,Ht===0&&(t.setRenderTargetTextures(b,et.colorTexture,f.ignoreDepthValues?void 0:et.depthStencilTexture),t.setRenderTarget(b))}let Zt=M[Ht];Zt===void 0&&(Zt=new Pe,Zt.layers.enable(Ht),Zt.viewport=new te,M[Ht]=Zt),Zt.matrix.fromArray(Ot.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(Ot.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(ie.x,ie.y,ie.width,ie.height),Ht===0&&(I.matrix.copy(Zt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),dt===!0&&I.cameras.push(Zt)}let kt=s.enabledFeatures;if(kt&&kt.includes("depth-sensing")){let Ht=u.getDepthInformation(vt[0]);Ht&&Ht.isValid&&Ht.texture&&y.init(t,Ht,s.renderState)}}for(let vt=0;vt<T.length;vt++){let dt=E[vt],kt=T[vt];dt!==null&&kt!==void 0&&kt.update(dt,nt,c||a)}Rt&&Rt(Y,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}let Ut=new $c;Ut.setAnimationLoop(Nt),this.setAnimationLoop=function(Y){Rt=Y},this.dispose=function(){}}},Ji=new Qe,Km=new ee;function Qm(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,qc(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,b,T,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,E)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),y(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,b,T):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===we&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===we&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let b=t.get(d),T=b.envMap,E=b.envMapRotation;T&&(m.envMap.value=T,Ji.copy(E),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),m.envMapRotation.value.setFromMatrix4(Km.makeRotationFromEuler(Ji)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,b,T){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=T*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===we&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function y(m,d){let b=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function qm(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,T){let E=T.program;i.uniformBlockBinding(b,E)}function c(b,T){let E=s[b.id];E===void 0&&(g(b),E=h(b),s[b.id]=E,b.addEventListener("dispose",m));let N=T.program;i.updateUBOMapping(b,N);let _=t.render.frame;r[b.id]!==_&&(f(b),r[b.id]=_)}function h(b){let T=u();b.__bindingPointIndex=T;let E=n.createBuffer(),N=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,N,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let T=s[b.id],E=b.uniforms,N=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let _=0,w=E.length;_<w;_++){let F=Array.isArray(E[_])?E[_]:[E[_]];for(let M=0,I=F.length;M<I;M++){let C=F[M];if(p(C,_,M,N)===!0){let Z=C.__offset,z=Array.isArray(C.value)?C.value:[C.value],V=0;for(let q=0;q<z.length;q++){let J=z[q],tt=y(J);typeof J=="number"||typeof J=="boolean"?(C.__data[0]=J,n.bufferSubData(n.UNIFORM_BUFFER,Z+V,C.__data)):J.isMatrix3?(C.__data[0]=J.elements[0],C.__data[1]=J.elements[1],C.__data[2]=J.elements[2],C.__data[3]=0,C.__data[4]=J.elements[3],C.__data[5]=J.elements[4],C.__data[6]=J.elements[5],C.__data[7]=0,C.__data[8]=J.elements[6],C.__data[9]=J.elements[7],C.__data[10]=J.elements[8],C.__data[11]=0):(J.toArray(C.__data,V),V+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Z,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,T,E,N){let _=b.value,w=T+"_"+E;if(N[w]===void 0)return typeof _=="number"||typeof _=="boolean"?N[w]=_:N[w]=_.clone(),!0;{let F=N[w];if(typeof _=="number"||typeof _=="boolean"){if(F!==_)return N[w]=_,!0}else if(F.equals(_)===!1)return F.copy(_),!0}return!1}function g(b){let T=b.uniforms,E=0,N=16;for(let w=0,F=T.length;w<F;w++){let M=Array.isArray(T[w])?T[w]:[T[w]];for(let I=0,C=M.length;I<C;I++){let Z=M[I],z=Array.isArray(Z.value)?Z.value:[Z.value];for(let V=0,q=z.length;V<q;V++){let J=z[V],tt=y(J),B=E%N,ut=B%tt.boundary,xt=B+ut;E+=ut,xt!==0&&N-xt<tt.storage&&(E+=N-xt),Z.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=E,E+=tt.storage}}}let _=E%N;return _>0&&(E+=N-_),b.__size=E,b.__cache={},this}function y(b){let T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),T}function m(b){let T=b.target;T.removeEventListener("dispose",m);let E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function d(){for(let b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}var cr=class{constructor(t={}){let{canvas:e=iu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),y=new Int32Array(4),m=null,d=null,b=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this.toneMapping=ri,this.toneMappingExposure=1;let E=this,N=!1,_=0,w=0,F=null,M=-1,I=null,C=new te,Z=new te,z=null,V=new St(0),q=0,J=e.width,tt=e.height,B=1,ut=null,xt=null,Rt=new te(0,0,J,tt),Nt=new te(0,0,J,tt),Ut=!1,Y=new rs,nt=!1,vt=!1,dt=new ee,kt=new ee,Ht=new P,Ot=new te,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Zt=!1;function et(){return F===null?B:1}let R=i;function Mt(S,U){return e.getContext(S,U)}try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qo}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),R===null){let U="webgl2";if(R=Mt(U,S),R===null)throw Mt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Q,it,$,Tt,st,v,x,H,W,j,D,ct,at,lt,pt,X,ot,bt,At,It,jt,Bt,ne,A;function ft(){Q=new pp(R),Q.init(),Bt=new Vm(R,Q),it=new lp(R,Q,t,Bt),$=new Wm(R,Q),it.reverseDepthBuffer&&f&&$.buffers.depth.setReversed(!0),Tt=new xp(R),st=new Cm,v=new Zm(R,Q,$,st,it,Bt,Tt),x=new hp(E),H=new fp(E),W=new Mu(R),ne=new ap(R,W),j=new mp(R,W,Tt,ne),D=new Sp(R,j,W,Tt),At=new yp(R,it,v),X=new cp(st),ct=new wm(E,x,H,Q,it,ne,X),at=new Qm(E,st),lt=new Um,pt=new Gm(Q),bt=new rp(E,x,H,$,D,p,l),ot=new Bm(E,D,it),A=new qm(R,Tt,it,$),It=new op(R,Q,Tt),jt=new gp(R,Q,Tt),Tt.programs=ct.programs,E.capabilities=it,E.extensions=Q,E.properties=st,E.renderLists=lt,E.shadowMap=ot,E.state=$,E.info=Tt}ft();let L=new Po(E,R);this.xr=L,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let S=Q.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Q.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(S){S!==void 0&&(B=S,this.setSize(J,tt,!1))},this.getSize=function(S){return S.set(J,tt)},this.setSize=function(S,U,O=!0){if(L.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=S,tt=U,e.width=Math.floor(S*B),e.height=Math.floor(U*B),O===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(J*B,tt*B).floor()},this.setDrawingBufferSize=function(S,U,O){J=S,tt=U,B=O,e.width=Math.floor(S*O),e.height=Math.floor(U*O),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(Rt)},this.setViewport=function(S,U,O,G){S.isVector4?Rt.set(S.x,S.y,S.z,S.w):Rt.set(S,U,O,G),$.viewport(C.copy(Rt).multiplyScalar(B).round())},this.getScissor=function(S){return S.copy(Nt)},this.setScissor=function(S,U,O,G){S.isVector4?Nt.set(S.x,S.y,S.z,S.w):Nt.set(S,U,O,G),$.scissor(Z.copy(Nt).multiplyScalar(B).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(S){$.setScissorTest(Ut=S)},this.setOpaqueSort=function(S){ut=S},this.setTransparentSort=function(S){xt=S},this.getClearColor=function(S){return S.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor.apply(bt,arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha.apply(bt,arguments)},this.clear=function(S=!0,U=!0,O=!0){let G=0;if(S){let k=!1;if(F!==null){let rt=F.texture.format;k=rt===ul||rt===hl||rt===cl}if(k){let rt=F.texture.type,gt=rt===Ii||rt===Ki||rt===ns||rt===Rn||rt===al||rt===ol,Pt=bt.getClearColor(),_t=bt.getClearAlpha(),Ft=Pt.r,Dt=Pt.g,wt=Pt.b;gt?(g[0]=Ft,g[1]=Dt,g[2]=wt,g[3]=_t,R.clearBufferuiv(R.COLOR,0,g)):(y[0]=Ft,y[1]=Dt,y[2]=wt,y[3]=_t,R.clearBufferiv(R.COLOR,0,y))}else G|=R.COLOR_BUFFER_BIT}U&&(G|=R.DEPTH_BUFFER_BIT),O&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),lt.dispose(),pt.dispose(),st.dispose(),x.dispose(),H.dispose(),D.dispose(),ne.dispose(),A.dispose(),ct.dispose(),L.dispose(),L.removeEventListener("sessionstart",yl),L.removeEventListener("sessionend",Sl),Gi.stop()};function K(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;let S=Tt.autoReset,U=ot.enabled,O=ot.autoUpdate,G=ot.needsUpdate,k=ot.type;ft(),Tt.autoReset=S,ot.enabled=U,ot.autoUpdate=O,ot.needsUpdate=G,ot.type=k}function mt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Gt(S){let U=S.target;U.removeEventListener("dispose",Gt),he(U)}function he(S){Te(S),st.remove(S)}function Te(S){let U=st.get(S).programs;U!==void 0&&(U.forEach(function(O){ct.releaseProgram(O)}),S.isShaderMaterial&&ct.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,O,G,k,rt){U===null&&(U=ie);let gt=k.isMesh&&k.matrixWorld.determinant()<0,Pt=uh(S,U,O,G,k);$.setMaterial(G,gt);let _t=O.index,Ft=1;if(G.wireframe===!0){if(_t=j.getWireframeAttribute(O),_t===void 0)return;Ft=2}let Dt=O.drawRange,wt=O.attributes.position,Xt=Dt.start*Ft,se=(Dt.start+Dt.count)*Ft;rt!==null&&(Xt=Math.max(Xt,rt.start*Ft),se=Math.min(se,(rt.start+rt.count)*Ft)),_t!==null?(Xt=Math.max(Xt,0),se=Math.min(se,_t.count)):wt!=null&&(Xt=Math.max(Xt,0),se=Math.min(se,wt.count));let re=se-Xt;if(re<0||re===1/0)return;ne.setup(k,G,Pt,O,_t);let Ae,Kt=It;if(_t!==null&&(Ae=W.get(_t),Kt=jt,Kt.setIndex(Ae)),k.isMesh)G.wireframe===!0?($.setLineWidth(G.wireframeLinewidth*et()),Kt.setMode(R.LINES)):Kt.setMode(R.TRIANGLES);else if(k.isLine){let Ct=G.linewidth;Ct===void 0&&(Ct=1),$.setLineWidth(Ct*et()),k.isLineSegments?Kt.setMode(R.LINES):k.isLineLoop?Kt.setMode(R.LINE_LOOP):Kt.setMode(R.LINE_STRIP)}else k.isPoints?Kt.setMode(R.POINTS):k.isSprite&&Kt.setMode(R.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Kt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))Kt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ct=k._multiDrawStarts,ci=k._multiDrawCounts,Qt=k._multiDrawCount,Ve=_t?W.get(_t).bytesPerElement:1,tn=st.get(G).currentProgram.getUniforms();for(let He=0;He<Qt;He++)tn.setValue(R,"_gl_DrawID",He),Kt.render(Ct[He]/Ve,ci[He])}else if(k.isInstancedMesh)Kt.renderInstances(Xt,re,k.count);else if(O.isInstancedBufferGeometry){let Ct=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ci=Math.min(O.instanceCount,Ct);Kt.renderInstances(Xt,re,ci)}else Kt.render(Xt,re)};function $t(S,U,O){S.transparent===!0&&S.side===xi&&S.forceSinglePass===!1?(S.side=we,S.needsUpdate=!0,ps(S,U,O),S.side=ki,S.needsUpdate=!0,ps(S,U,O),S.side=xi):ps(S,U,O)}this.compile=function(S,U,O=null){O===null&&(O=S),d=pt.get(O),d.init(U),T.push(d),O.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(d.pushLight(k),k.castShadow&&d.pushShadow(k))}),S!==O&&S.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(d.pushLight(k),k.castShadow&&d.pushShadow(k))}),d.setupLights();let G=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let rt=k.material;if(rt)if(Array.isArray(rt))for(let gt=0;gt<rt.length;gt++){let Pt=rt[gt];$t(Pt,O,k),G.add(Pt)}else $t(rt,O,k),G.add(rt)}),T.pop(),d=null,G},this.compileAsync=function(S,U,O=null){let G=this.compile(S,U,O);return new Promise(k=>{function rt(){if(G.forEach(function(gt){st.get(gt).currentProgram.isReady()&&G.delete(gt)}),G.size===0){k(S);return}setTimeout(rt,10)}Q.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let Ze=null;function li(S){Ze&&Ze(S)}function yl(){Gi.stop()}function Sl(){Gi.start()}let Gi=new $c;Gi.setAnimationLoop(li),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(S){Ze=S,L.setAnimationLoop(S),S===null?Gi.stop():Gi.start()},L.addEventListener("sessionstart",yl),L.addEventListener("sessionend",Sl),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),L.enabled===!0&&L.isPresenting===!0&&(L.cameraAutoUpdate===!0&&L.updateCamera(U),U=L.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,U,F),d=pt.get(S,T.length),d.init(U),T.push(d),kt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(kt),vt=this.localClippingEnabled,nt=X.init(this.clippingPlanes,vt),m=lt.get(S,b.length),m.init(),b.push(m),L.enabled===!0&&L.isPresenting===!0){let rt=E.xr.getDepthSensingMesh();rt!==null&&zr(rt,U,-1/0,E.sortObjects)}zr(S,U,0,E.sortObjects),m.finish(),E.sortObjects===!0&&m.sort(ut,xt),Zt=L.enabled===!1||L.isPresenting===!1||L.hasDepthSensing()===!1,Zt&&bt.addToRenderList(m,S),this.info.render.frame++,nt===!0&&X.beginShadows();let O=d.state.shadowsArray;ot.render(O,S,U),nt===!0&&X.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=m.opaque,k=m.transmissive;if(d.setupLights(),U.isArrayCamera){let rt=U.cameras;if(k.length>0)for(let gt=0,Pt=rt.length;gt<Pt;gt++){let _t=rt[gt];El(G,k,S,_t)}Zt&&bt.render(S);for(let gt=0,Pt=rt.length;gt<Pt;gt++){let _t=rt[gt];Il(m,S,_t,_t.viewport)}}else k.length>0&&El(G,k,S,U),Zt&&bt.render(S),Il(m,S,U);F!==null&&(v.updateMultisampleRenderTarget(F),v.updateRenderTargetMipmap(F)),S.isScene===!0&&S.onAfterRender(E,S,U),ne.resetDefaultState(),M=-1,I=null,T.pop(),T.length>0?(d=T[T.length-1],nt===!0&&X.setGlobalState(E.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function zr(S,U,O,G){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)O=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){G&&Ot.setFromMatrixPosition(S.matrixWorld).applyMatrix4(kt);let gt=D.update(S),Pt=S.material;Pt.visible&&m.push(S,gt,Pt,O,Ot.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){let gt=D.update(S),Pt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ot.copy(S.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Ot.copy(gt.boundingSphere.center)),Ot.applyMatrix4(S.matrixWorld).applyMatrix4(kt)),Array.isArray(Pt)){let _t=gt.groups;for(let Ft=0,Dt=_t.length;Ft<Dt;Ft++){let wt=_t[Ft],Xt=Pt[wt.materialIndex];Xt&&Xt.visible&&m.push(S,gt,Xt,O,Ot.z,wt)}}else Pt.visible&&m.push(S,gt,Pt,O,Ot.z,null)}}let rt=S.children;for(let gt=0,Pt=rt.length;gt<Pt;gt++)zr(rt[gt],U,O,G)}function Il(S,U,O,G){let k=S.opaque,rt=S.transmissive,gt=S.transparent;d.setupLightsView(O),nt===!0&&X.setGlobalState(E.clippingPlanes,O),G&&$.viewport(C.copy(G)),k.length>0&&fs(k,U,O),rt.length>0&&fs(rt,U,O),gt.length>0&&fs(gt,U,O),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function El(S,U,O,G){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[G.id]===void 0&&(d.state.transmissionRenderTarget[G.id]=new Ee(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?ze:Ii,minFilter:Xi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Vt.workingColorSpace}));let rt=d.state.transmissionRenderTarget[G.id],gt=G.viewport||C;rt.setSize(gt.z,gt.w);let Pt=E.getRenderTarget();E.setRenderTarget(rt),E.getClearColor(V),q=E.getClearAlpha(),q<1&&E.setClearColor(16777215,.5),E.clear(),Zt&&bt.render(O);let _t=E.toneMapping;E.toneMapping=ri;let Ft=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),d.setupLightsView(G),nt===!0&&X.setGlobalState(E.clippingPlanes,G),fs(S,O,G),v.updateMultisampleRenderTarget(rt),v.updateRenderTargetMipmap(rt),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Dt=!1;for(let wt=0,Xt=U.length;wt<Xt;wt++){let se=U[wt],re=se.object,Ae=se.geometry,Kt=se.material,Ct=se.group;if(Kt.side===xi&&re.layers.test(G.layers)){let ci=Kt.side;Kt.side=we,Kt.needsUpdate=!0,vl(re,O,G,Ae,Kt,Ct),Kt.side=ci,Kt.needsUpdate=!0,Dt=!0}}Dt===!0&&(v.updateMultisampleRenderTarget(rt),v.updateRenderTargetMipmap(rt))}E.setRenderTarget(Pt),E.setClearColor(V,q),Ft!==void 0&&(G.viewport=Ft),E.toneMapping=_t}function fs(S,U,O){let G=U.isScene===!0?U.overrideMaterial:null;for(let k=0,rt=S.length;k<rt;k++){let gt=S[k],Pt=gt.object,_t=gt.geometry,Ft=G===null?gt.material:G,Dt=gt.group;Pt.layers.test(O.layers)&&vl(Pt,U,O,_t,Ft,Dt)}}function vl(S,U,O,G,k,rt){S.onBeforeRender(E,U,O,G,k,rt),S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(E,U,O,G,S,rt),k.transparent===!0&&k.side===xi&&k.forceSinglePass===!1?(k.side=we,k.needsUpdate=!0,E.renderBufferDirect(O,U,G,k,S,rt),k.side=ki,k.needsUpdate=!0,E.renderBufferDirect(O,U,G,k,S,rt),k.side=xi):E.renderBufferDirect(O,U,G,k,S,rt),S.onAfterRender(E,U,O,G,k,rt)}function ps(S,U,O){U.isScene!==!0&&(U=ie);let G=st.get(S),k=d.state.lights,rt=d.state.shadowsArray,gt=k.state.version,Pt=ct.getParameters(S,k.state,rt,U,O),_t=ct.getProgramCacheKey(Pt),Ft=G.programs;G.environment=S.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(S.isMeshStandardMaterial?H:x).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Ft===void 0&&(S.addEventListener("dispose",Gt),Ft=new Map,G.programs=Ft);let Dt=Ft.get(_t);if(Dt!==void 0){if(G.currentProgram===Dt&&G.lightsStateVersion===gt)return Tl(S,Pt),Dt}else Pt.uniforms=ct.getUniforms(S),S.onBeforeCompile(Pt,E),Dt=ct.acquireProgram(Pt,_t),Ft.set(_t,Dt),G.uniforms=Pt.uniforms;let wt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(wt.clippingPlanes=X.uniform),Tl(S,Pt),G.needsLights=fh(S),G.lightsStateVersion=gt,G.needsLights&&(wt.ambientLightColor.value=k.state.ambient,wt.lightProbe.value=k.state.probe,wt.directionalLights.value=k.state.directional,wt.directionalLightShadows.value=k.state.directionalShadow,wt.spotLights.value=k.state.spot,wt.spotLightShadows.value=k.state.spotShadow,wt.rectAreaLights.value=k.state.rectArea,wt.ltc_1.value=k.state.rectAreaLTC1,wt.ltc_2.value=k.state.rectAreaLTC2,wt.pointLights.value=k.state.point,wt.pointLightShadows.value=k.state.pointShadow,wt.hemisphereLights.value=k.state.hemi,wt.directionalShadowMap.value=k.state.directionalShadowMap,wt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,wt.spotShadowMap.value=k.state.spotShadowMap,wt.spotLightMatrix.value=k.state.spotLightMatrix,wt.spotLightMap.value=k.state.spotLightMap,wt.pointShadowMap.value=k.state.pointShadowMap,wt.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=Dt,G.uniformsList=null,Dt}function Ml(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=En.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Tl(S,U){let O=st.get(S);O.outputColorSpace=U.outputColorSpace,O.batching=U.batching,O.batchingColor=U.batchingColor,O.instancing=U.instancing,O.instancingColor=U.instancingColor,O.instancingMorph=U.instancingMorph,O.skinning=U.skinning,O.morphTargets=U.morphTargets,O.morphNormals=U.morphNormals,O.morphColors=U.morphColors,O.morphTargetsCount=U.morphTargetsCount,O.numClippingPlanes=U.numClippingPlanes,O.numIntersection=U.numClipIntersection,O.vertexAlphas=U.vertexAlphas,O.vertexTangents=U.vertexTangents,O.toneMapping=U.toneMapping}function uh(S,U,O,G,k){U.isScene!==!0&&(U=ie),v.resetTextureUnits();let rt=U.fog,gt=G.isMeshStandardMaterial?U.environment:null,Pt=F===null?E.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:On,_t=(G.isMeshStandardMaterial?H:x).get(G.envMap||gt),Ft=G.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Dt=!!O.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),wt=!!O.morphAttributes.position,Xt=!!O.morphAttributes.normal,se=!!O.morphAttributes.color,re=ri;G.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(re=E.toneMapping);let Ae=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Kt=Ae!==void 0?Ae.length:0,Ct=st.get(G),ci=d.state.lights;if(nt===!0&&(vt===!0||S!==I)){let Le=S===I&&G.id===M;X.setState(G,S,Le)}let Qt=!1;G.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==ci.state.version||Ct.outputColorSpace!==Pt||k.isBatchedMesh&&Ct.batching===!1||!k.isBatchedMesh&&Ct.batching===!0||k.isBatchedMesh&&Ct.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ct.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ct.instancing===!1||!k.isInstancedMesh&&Ct.instancing===!0||k.isSkinnedMesh&&Ct.skinning===!1||!k.isSkinnedMesh&&Ct.skinning===!0||k.isInstancedMesh&&Ct.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ct.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ct.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ct.instancingMorph===!1&&k.morphTexture!==null||Ct.envMap!==_t||G.fog===!0&&Ct.fog!==rt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==X.numPlanes||Ct.numIntersection!==X.numIntersection)||Ct.vertexAlphas!==Ft||Ct.vertexTangents!==Dt||Ct.morphTargets!==wt||Ct.morphNormals!==Xt||Ct.morphColors!==se||Ct.toneMapping!==re||Ct.morphTargetsCount!==Kt)&&(Qt=!0):(Qt=!0,Ct.__version=G.version);let Ve=Ct.currentProgram;Qt===!0&&(Ve=ps(G,U,k));let tn=!1,He=!1,Bn=!1,ae=Ve.getUniforms(),ti=Ct.uniforms;if($.useProgram(Ve.program)&&(tn=!0,He=!0,Bn=!0),G.id!==M&&(M=G.id,He=!0),tn||I!==S){$.buffers.depth.getReversed()?(dt.copy(S.projectionMatrix),su(dt),ru(dt),ae.setValue(R,"projectionMatrix",dt)):ae.setValue(R,"projectionMatrix",S.projectionMatrix),ae.setValue(R,"viewMatrix",S.matrixWorldInverse);let Mi=ae.map.cameraPosition;Mi!==void 0&&Mi.setValue(R,Ht.setFromMatrixPosition(S.matrixWorld)),it.logarithmicDepthBuffer&&ae.setValue(R,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ae.setValue(R,"isOrthographic",S.isOrthographicCamera===!0),I!==S&&(I=S,He=!0,Bn=!0)}if(k.isSkinnedMesh){ae.setOptional(R,k,"bindMatrix"),ae.setOptional(R,k,"bindMatrixInverse");let Le=k.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),ae.setValue(R,"boneTexture",Le.boneTexture,v))}k.isBatchedMesh&&(ae.setOptional(R,k,"batchingTexture"),ae.setValue(R,"batchingTexture",k._matricesTexture,v),ae.setOptional(R,k,"batchingIdTexture"),ae.setValue(R,"batchingIdTexture",k._indirectTexture,v),ae.setOptional(R,k,"batchingColorTexture"),k._colorsTexture!==null&&ae.setValue(R,"batchingColorTexture",k._colorsTexture,v));let Ln=O.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&At.update(k,O,Ve),(He||Ct.receiveShadow!==k.receiveShadow)&&(Ct.receiveShadow=k.receiveShadow,ae.setValue(R,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(ti.envMap.value=_t,ti.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(ti.envMapIntensity.value=U.environmentIntensity),He&&(ae.setValue(R,"toneMappingExposure",E.toneMappingExposure),Ct.needsLights&&dh(ti,Bn),rt&&G.fog===!0&&at.refreshFogUniforms(ti,rt),at.refreshMaterialUniforms(ti,G,B,tt,d.state.transmissionRenderTarget[S.id]),En.upload(R,Ml(Ct),ti,v)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(En.upload(R,Ml(Ct),ti,v),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ae.setValue(R,"center",k.center),ae.setValue(R,"modelViewMatrix",k.modelViewMatrix),ae.setValue(R,"normalMatrix",k.normalMatrix),ae.setValue(R,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Le=G.uniformsGroups;for(let Mi=0,Ti=Le.length;Mi<Ti;Mi++){let bl=Le[Mi];A.update(bl,Ve),A.bind(bl,Ve)}}return Ve}function dh(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function fh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(S,U,O){st.get(S.texture).__webglTexture=U,st.get(S.depthTexture).__webglTexture=O;let G=st.get(S);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=O===void 0,G.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){let O=st.get(S);O.__webglFramebuffer=U,O.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,O=0){F=S,_=U,w=O;let G=!0,k=null,rt=!1,gt=!1;if(S){let _t=st.get(S);if(_t.__useDefaultFramebuffer!==void 0)$.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(_t.__webglFramebuffer===void 0)v.setupRenderTarget(S);else if(_t.__hasExternalTextures)v.rebindTextures(S,st.get(S.texture).__webglTexture,st.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let wt=S.depthTexture;if(_t.__boundDepthTexture!==wt){if(wt!==null&&st.has(wt)&&(S.width!==wt.image.width||S.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(S)}}let Ft=S.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(gt=!0);let Dt=st.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Dt[U])?k=Dt[U][O]:k=Dt[U],rt=!0):S.samples>0&&v.useMultisampledRTT(S)===!1?k=st.get(S).__webglMultisampledFramebuffer:Array.isArray(Dt)?k=Dt[O]:k=Dt,C.copy(S.viewport),Z.copy(S.scissor),z=S.scissorTest}else C.copy(Rt).multiplyScalar(B).floor(),Z.copy(Nt).multiplyScalar(B).floor(),z=Ut;if($.bindFramebuffer(R.FRAMEBUFFER,k)&&G&&$.drawBuffers(S,k),$.viewport(C),$.scissor(Z),$.setScissorTest(z),rt){let _t=st.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,_t.__webglTexture,O)}else if(gt){let _t=st.get(S.texture),Ft=U||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,_t.__webglTexture,O||0,Ft)}M=-1},this.readRenderTargetPixels=function(S,U,O,G,k,rt,gt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=st.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&gt!==void 0&&(Pt=Pt[gt]),Pt){$.bindFramebuffer(R.FRAMEBUFFER,Pt);try{let _t=S.texture,Ft=_t.format,Dt=_t.type;if(!it.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-G&&O>=0&&O<=S.height-k&&R.readPixels(U,O,G,k,Bt.convert(Ft),Bt.convert(Dt),rt)}finally{let _t=F!==null?st.get(F).__webglFramebuffer:null;$.bindFramebuffer(R.FRAMEBUFFER,_t)}}},this.readRenderTargetPixelsAsync=async function(S,U,O,G,k,rt,gt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=st.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&gt!==void 0&&(Pt=Pt[gt]),Pt){let _t=S.texture,Ft=_t.format,Dt=_t.type;if(!it.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-G&&O>=0&&O<=S.height-k){$.bindFramebuffer(R.FRAMEBUFFER,Pt);let wt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,wt),R.bufferData(R.PIXEL_PACK_BUFFER,rt.byteLength,R.STREAM_READ),R.readPixels(U,O,G,k,Bt.convert(Ft),Bt.convert(Dt),0);let Xt=F!==null?st.get(F).__webglFramebuffer:null;$.bindFramebuffer(R.FRAMEBUFFER,Xt);let se=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await nu(R,se,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,wt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,rt),R.deleteBuffer(wt),R.deleteSync(se),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,U=null,O=0){S.isTexture!==!0&&(qn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);let G=Math.pow(2,-O),k=Math.floor(S.image.width*G),rt=Math.floor(S.image.height*G),gt=U!==null?U.x:0,Pt=U!==null?U.y:0;v.setTexture2D(S,0),R.copyTexSubImage2D(R.TEXTURE_2D,O,0,0,gt,Pt,k,rt),$.unbindTexture()},this.copyTextureToTexture=function(S,U,O=null,G=null,k=0){S.isTexture!==!0&&(qn("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,S=arguments[1],U=arguments[2],k=arguments[3]||0,O=null);let rt,gt,Pt,_t,Ft,Dt,wt,Xt,se,re=S.isCompressedTexture?S.mipmaps[k]:S.image;O!==null?(rt=O.max.x-O.min.x,gt=O.max.y-O.min.y,Pt=O.isBox3?O.max.z-O.min.z:1,_t=O.min.x,Ft=O.min.y,Dt=O.isBox3?O.min.z:0):(rt=re.width,gt=re.height,Pt=re.depth||1,_t=0,Ft=0,Dt=0),G!==null?(wt=G.x,Xt=G.y,se=G.z):(wt=0,Xt=0,se=0);let Ae=Bt.convert(U.format),Kt=Bt.convert(U.type),Ct;U.isData3DTexture?(v.setTexture3D(U,0),Ct=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(v.setTexture2DArray(U,0),Ct=R.TEXTURE_2D_ARRAY):(v.setTexture2D(U,0),Ct=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);let ci=R.getParameter(R.UNPACK_ROW_LENGTH),Qt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ve=R.getParameter(R.UNPACK_SKIP_PIXELS),tn=R.getParameter(R.UNPACK_SKIP_ROWS),He=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,re.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,re.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,_t),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ft),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Dt);let Bn=S.isDataArrayTexture||S.isData3DTexture,ae=U.isDataArrayTexture||U.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){let ti=st.get(S),Ln=st.get(U),Le=st.get(ti.__renderTarget),Mi=st.get(Ln.__renderTarget);$.bindFramebuffer(R.READ_FRAMEBUFFER,Le.__webglFramebuffer),$.bindFramebuffer(R.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let Ti=0;Ti<Pt;Ti++)Bn&&R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,st.get(S).__webglTexture,k,Dt+Ti),S.isDepthTexture?(ae&&R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,st.get(U).__webglTexture,k,se+Ti),R.blitFramebuffer(_t,Ft,rt,gt,wt,Xt,rt,gt,R.DEPTH_BUFFER_BIT,R.NEAREST)):ae?R.copyTexSubImage3D(Ct,k,wt,Xt,se+Ti,_t,Ft,rt,gt):R.copyTexSubImage2D(Ct,k,wt,Xt,se+Ti,_t,Ft,rt,gt);$.bindFramebuffer(R.READ_FRAMEBUFFER,null),$.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else ae?S.isDataTexture||S.isData3DTexture?R.texSubImage3D(Ct,k,wt,Xt,se,rt,gt,Pt,Ae,Kt,re.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(Ct,k,wt,Xt,se,rt,gt,Pt,Ae,re.data):R.texSubImage3D(Ct,k,wt,Xt,se,rt,gt,Pt,Ae,Kt,re):S.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,k,wt,Xt,rt,gt,Ae,Kt,re.data):S.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,k,wt,Xt,re.width,re.height,Ae,re.data):R.texSubImage2D(R.TEXTURE_2D,k,wt,Xt,rt,gt,Ae,Kt,re);R.pixelStorei(R.UNPACK_ROW_LENGTH,ci),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Qt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ve),R.pixelStorei(R.UNPACK_SKIP_ROWS,tn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,He),k===0&&U.generateMipmaps&&R.generateMipmap(Ct),$.unbindTexture()},this.copyTextureToTexture3D=function(S,U,O=null,G=null,k=0){return S.isTexture!==!0&&(qn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,G=arguments[1]||null,S=arguments[2],U=arguments[3],k=arguments[4]||0),qn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,U,O,G,k)},this.initRenderTarget=function(S){st.get(S).__webglFramebuffer===void 0&&v.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?v.setTextureCube(S,0):S.isData3DTexture?v.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?v.setTexture2DArray(S,0):v.setTexture2D(S,0),$.unbindTexture()},this.resetState=function(){_=0,w=0,F=null,$.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Vt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Vt._getUnpackColorSpace()}},hr=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new St(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Un=class extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qe,this.environmentIntensity=1,this.environmentRotation=new Qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var _o=class extends Ge{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Oe,h=Oe,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ur=class extends de{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},gn=new ee,bc=new ee,Ns=[],Rc=new Ei,$m=new ee,jn=new Jt,Xn=new vi,as=class extends Jt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ur(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,$m)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ei),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,gn),Rc.copy(t.boundingBox).applyMatrix4(gn),this.boundingBox.union(Rc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,gn),Xn.copy(t.boundingSphere).applyMatrix4(gn),this.boundingSphere.union(Xn)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(jn.geometry=this.geometry,jn.material=this.material,jn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xn.copy(this.boundingSphere),Xn.applyMatrix4(i),t.ray.intersectsSphere(Xn)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,gn),bc.multiplyMatrices(i,gn),jn.matrixWorld=bc,jn.raycast(t,Ns);for(let a=0,o=Ns.length;a<o;a++){let l=Ns[a];l.instanceId=r,l.object=this,e.push(l)}Ns.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ur(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new _o(new Float32Array(s*this.count),s,this.count,ll,ni));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var os=class extends ai{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},dr=new P,fr=new P,Pc=new ee,Kn=new ss,Os=new vi,xa=new P,_c=new P,wo=class extends me{constructor(t=new ve,e=new os){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)dr.fromBufferAttribute(e,s-1),fr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=dr.distanceTo(fr);t.setAttribute("lineDistance",new le(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere),Os.applyMatrix4(s),Os.radius+=r,t.ray.intersectsSphere(Os)===!1)return;Pc.copy(s).invert(),Kn.copy(t.ray).applyMatrix4(Pc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=p,m=g-1;y<m;y+=c){let d=h.getX(y),b=h.getX(y+1),T=Gs(this,t,Kn,l,d,b);T&&e.push(T)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(p),d=Gs(this,t,Kn,l,y,m);d&&e.push(d)}}else{let p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let y=p,m=g-1;y<m;y+=c){let d=Gs(this,t,Kn,l,y,y+1);d&&e.push(d)}if(this.isLineLoop){let y=Gs(this,t,Kn,l,g-1,p);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gs(n,t,e,i,s,r){let a=n.geometry.attributes.position;if(dr.fromBufferAttribute(a,s),fr.fromBufferAttribute(a,r),e.distanceSqToSegment(dr,fr,xa,_c)>i)return;xa.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(xa);if(!(l<t.near||l>t.far))return{distance:l,point:_c.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}var wc=new P,Cc=new P,pr=class extends wo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)wc.fromBufferAttribute(e,s),Cc.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+wc.distanceTo(Cc);t.setAttribute("lineDistance",new le(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Co=class extends ai{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ac=new ee,Ao=new ss,Ds=new vi,zs=new P,mr=class extends me{constructor(t=new ve,e=new Co){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ds.copy(i.boundingSphere),Ds.applyMatrix4(s),Ds.radius+=r,t.ray.intersectsSphere(Ds)===!1)return;Ac.copy(s).invert(),Ao.copy(t.ray).applyMatrix4(Ac);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,y=p;g<y;g++){let m=c.getX(g);zs.fromBufferAttribute(u,m),Uc(zs,m,l,s,t,e,this)}}else{let f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,y=p;g<y;g++)zs.fromBufferAttribute(u,g),Uc(zs,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Uc(n,t,e,i,s,r,a){let o=Ao.distanceSqToPoint(n);if(o<e){let l=new P;Ao.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var qe=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],f=i[s+1]-h,p=(a-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new Et:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new P,s=[],r=[],a=[],o=new P,l=new ee;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ie(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ie(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},gr=class extends qe{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Et){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Uo=class extends gr{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function pl(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,p*=h,s(a,o,f,p)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Bs=new P,ya=new pl,Sa=new pl,Ia=new pl,kn=class extends qe{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new P){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Bs.subVectors(s[0],s[1]).add(s[0]),c=Bs);let u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Bs.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Bs),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),p),y=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),ya.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,y,m),Sa.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,y,m),Ia.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&(ya.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Sa.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Ia.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(ya.calc(l),Sa.calc(l),Ia.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function kc(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function tg(n,t){let e=1-n;return e*e*t}function eg(n,t){return 2*(1-n)*n*t}function ig(n,t){return n*n*t}function es(n,t,e,i){return tg(n,t)+eg(n,e)+ig(n,i)}function ng(n,t){let e=1-n;return e*e*e*t}function sg(n,t){let e=1-n;return 3*e*e*n*t}function rg(n,t){return 3*(1-n)*n*n*t}function ag(n,t){return n*n*n*t}function is(n,t,e,i,s){return ng(n,t)+sg(n,e)+rg(n,i)+ag(n,s)}var ko=class extends qe{constructor(t=new Et,e=new Et,i=new Et,s=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Et){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(is(t,s.x,r.x,a.x,o.x),is(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ho=class extends qe{constructor(t=new P,e=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(is(t,s.x,r.x,a.x,o.x),is(t,s.y,r.y,a.y,o.y),is(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Fo=class extends qe{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},No=class extends qe{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Oo=class extends qe{constructor(t=new Et,e=new Et,i=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Et){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(es(t,s.x,r.x,a.x),es(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xr=class extends qe{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(es(t,s.x,r.x,a.x),es(t,s.y,r.y,a.y),es(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Go=class extends qe{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(kc(o,l.x,c.x,h.x,u.x),kc(o,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new Et().fromArray(s))}return this}},og=Object.freeze({__proto__:null,ArcCurve:Uo,CatmullRomCurve3:kn,CubicBezierCurve:ko,CubicBezierCurve3:Ho,EllipseCurve:gr,LineCurve:Fo,LineCurve3:No,QuadraticBezierCurve:Oo,QuadraticBezierCurve3:xr,SplineCurve:Go});var Ls=new P,Ws=new P,Ea=new P,Js=new Ui,yr=class extends ve{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Qs*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},p=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:y,b:m,c:d}=Js;if(y.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),Js.getNormal(Ea),u[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){let T=(b+1)%3,E=u[b],N=u[T],_=Js[h[b]],w=Js[h[T]],F=`${E}_${N}`,M=`${N}_${E}`;M in f&&f[M]?(Ea.dot(f[M].normal)<=r&&(p.push(_.x,_.y,_.z),p.push(w.x,w.y,w.z)),f[M]=null):F in f||(f[F]={index0:c[b],index1:c[T],normal:Ea.clone()})}}for(let g in f)if(f[g]){let{index0:y,index1:m}=f[g];Ls.fromBufferAttribute(o,y),Ws.fromBufferAttribute(o,m),p.push(Ls.x,Ls.y,Ls.z),p.push(Ws.x,Ws.y,Ws.z)}this.setAttribute("position",new le(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Hn=class n extends ve{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new P,f=new P,p=[],g=[],y=[],m=[];for(let d=0;d<=i;d++){let b=[],T=d/i,E=0;d===0&&a===0?E=.5/e:d===i&&l===Math.PI&&(E=-.5/e);for(let N=0;N<=e;N++){let _=N/e;u.x=-t*Math.cos(s+_*r)*Math.sin(a+T*o),u.y=t*Math.cos(a+T*o),u.z=t*Math.sin(s+_*r)*Math.sin(a+T*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),m.push(_+E,1-T),b.push(c++)}h.push(b)}for(let d=0;d<i;d++)for(let b=0;b<e;b++){let T=h[d][b+1],E=h[d][b],N=h[d+1][b],_=h[d+1][b+1];(d!==0||a>0)&&p.push(T,E,_),(d!==i-1||l<Math.PI)&&p.push(E,N,_)}this.setIndex(p),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(y,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Sr=class n extends ve{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new P,u=new P,f=new P;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){let y=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(y),u.y=(t+e*Math.cos(m))*Math.sin(y),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){let y=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,b=(s+1)*p+g;a.push(y,m,b),a.push(m,d,b)}this.setIndex(a),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(l,3)),this.setAttribute("uv",new le(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ir=class n extends ve{constructor(t=new xr(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new Et,h=new P,u=[],f=[],p=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new le(u,3)),this.setAttribute("normal",new le(f,3)),this.setAttribute("uv",new le(p,2));function y(){for(let T=0;T<e;T++)m(T);m(r===!1?e:0),b(),d()}function m(T){h=t.getPointAt(T/e,h);let E=a.normals[T],N=a.binormals[T];for(let _=0;_<=s;_++){let w=_/s*Math.PI*2,F=Math.sin(w),M=-Math.cos(w);l.x=M*E.x+F*N.x,l.y=M*E.y+F*N.y,l.z=M*E.z+F*N.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function d(){for(let T=1;T<=e;T++)for(let E=1;E<=s;E++){let N=(s+1)*(T-1)+(E-1),_=(s+1)*T+(E-1),w=(s+1)*T+E,F=(s+1)*(T-1)+E;g.push(N,_,F),g.push(_,w,F)}}function b(){for(let T=0;T<=e;T++)for(let E=0;E<=s;E++)c.x=T/e,c.y=E/s,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new og[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Er=class extends fe{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}},De=class extends ai{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dl,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},vr=class extends De{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ie(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new St(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new St(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new St(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Mr=class extends ai{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dl,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Zs(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function lg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Fn=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Do=class extends Fn{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wl,endingEnd:wl}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Cl:r=t,o=2*e-i;break;case Al:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Cl:a=t,l=2*i-e;break;case Al:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),y=g*g,m=y*g,d=-f*m+2*f*y-f*g,b=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,T=(-1-p)*m+(1.5+p)*y+.5*g,E=p*m-p*y;for(let N=0;N!==o;++N)r[N]=d*a[h+N]+b*a[c+N]+T*a[l+N]+E*a[u+N];return r}},zo=class extends Fn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*u+a[l+f]*h;return r}},Bo=class extends Fn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},$e=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Zs(e,this.TimeBufferType),this.values=Zs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Zs(t.times,Array),values:Zs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Bo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new zo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Do(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case qs:e=this.InterpolantFactoryMethodDiscrete;break;case co:e=this.InterpolantFactoryMethodLinear;break;case Wr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qs;case this.InterpolantFactoryMethodLinear:return co;case this.InterpolantFactoryMethodSmooth:return Wr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&lg(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Wr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*i,f=u-i,p=u+i;for(let g=0;g!==i;++g){let y=e[u+g];if(y!==e[f+g]||y!==e[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,f=a*i;for(let p=0;p!==i;++p)e[f+p]=e[u+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};$e.prototype.TimeBufferType=Float32Array;$e.prototype.ValueBufferType=Float32Array;$e.prototype.DefaultInterpolation=co;var Qi=class extends $e{constructor(t,e,i){super(t,e,i)}};Qi.prototype.ValueTypeName="bool";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=qs;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Lo=class extends $e{};Lo.prototype.ValueTypeName="color";var Wo=class extends $e{};Wo.prototype.ValueTypeName="number";var Jo=class extends Fn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Fi.slerpFlat(r,0,a,c-o,a,c,l);return r}},Tr=class extends $e{InterpolantFactoryMethodLinear(t){return new Jo(this.times,this.values,this.getValueSize(),t)}};Tr.prototype.ValueTypeName="quaternion";Tr.prototype.InterpolantFactoryMethodSmooth=void 0;var qi=class extends $e{constructor(t,e,i){super(t,e,i)}};qi.prototype.ValueTypeName="string";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=qs;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends $e{};Zo.prototype.ValueTypeName="vector";var Vo=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},cg=new Vo,Yo=class{constructor(t){this.manager=t!==void 0?t:cg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Yo.DEFAULT_MATERIAL_NAME="__DEFAULT";var ls=class extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new St(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},br=class extends ls{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},va=new ee,Hc=new P,Fc=new P,Rr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rs,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hc),Fc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fc),e.updateMatrixWorld(),va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Nc=new ee,Qn=new P,Ma=new P,jo=class extends Rr{constructor(){super(new Pe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Qn.setFromMatrixPosition(t.matrixWorld),i.position.copy(Qn),Ma.copy(i.position),Ma.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Ma),i.updateMatrixWorld(),s.makeTranslation(-Qn.x,-Qn.y,-Qn.z),Nc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nc)}},Nn=class extends ls{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new jo}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Xo=class extends Rr{constructor(){super(new Cn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Pr=class extends ls{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new Xo}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var _r=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Oc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Oc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Oc(){return performance.now()}var ml="\\[\\]\\.:\\/",hg=new RegExp("["+ml+"]","g"),gl="[^"+ml+"]",ug="[^"+ml.replace("\\.","")+"]",dg=/((?:WC+[\/:])*)/.source.replace("WC",gl),fg=/(WCOD+)?/.source.replace("WCOD",ug),pg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gl),mg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gl),gg=new RegExp("^"+dg+fg+pg+mg+"$"),xg=["material","materials","bones","map"],Ko=class{constructor(t,e,i){let s=i||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},oe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(hg,"")}static parseTrackName(t){let e=gg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);xg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=Ko;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _g=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qo);var Ur={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Be=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Sg=new Cn(-1,1,1,-1,0,1),xl=class extends ve{constructor(){super(),this.setAttribute("position",new le([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new le([0,2,0,0,2,0],2))}},Ig=new xl,Oi=class{constructor(t){this._mesh=new Jt(Ig,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Sg)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var kr=class extends Be{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof fe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ni.clone(t.uniforms),this.material=new fe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Oi(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var hs=class extends Be{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Hr=class extends Be{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Fr=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new Et);this._width=i.width,this._height=i.height,e=new Ee(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ze}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new kr(Ur),this.copyPass.material.blending=si,this.clock=new _r}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}hs!==void 0&&(a instanceof hs?i=!0:a instanceof Hr&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new Et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Nr=class extends Be{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new St}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var sh={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new St(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Dn=class n extends Be{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Et(t.x,t.y):new Et(256,256),this.clearColor=new St(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ee(r,a,{type:ze}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let f=new Ee(r,a,{type:ze});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let p=new Ee(r,a,{type:ze});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}let o=sh;this.highPassUniforms=Ni.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new fe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Et(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=Ur;this.copyUniforms=Ni.clone(h.uniforms),this.blendMaterial=new fe({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:vn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new St,this.oldClearAlpha=1,this.basic=new oi,this.fsQuad=new Oi(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Et(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){let e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new fe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Et(.5,.5)},direction:{value:new Et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new fe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Dn.BlurDirectionX=new Et(1,0);Dn.BlurDirectionY=new Et(0,1);var rh={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Or=class extends Be{constructor(){super();let t=rh;this.uniforms=Ni.clone(t.uniforms),this.material=new Er({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Oi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Vt.getTransfer(this._outputColorSpace)===qt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$o?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===tl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===el?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===il?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===nl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===sl&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Gr=class extends Un{constructor(){super();let t=new Je;t.deleteAttribute("uv");let e=new De({side:we}),i=new De,s=new Nn(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Jt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Jt(t,i);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);let o=new Jt(t,i);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);let l=new Jt(t,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);let c=new Jt(t,i);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);let h=new Jt(t,i);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let u=new Jt(t,i);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);let f=new Jt(t,zn(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);let p=new Jt(t,zn(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);let g=new Jt(t,zn(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);let y=new Jt(t,zn(43));y.position.set(-.462,8.89,14.52),y.scale.set(4.38,5.441,.088),this.add(y);let m=new Jt(t,zn(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);let d=new Jt(t,zn(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function zn(n){let t=new oi;return t.color.setScalar(n),t}var ah="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tF0eh0a1XR+IR7ZdH4hJt10fiEi4XSCJSbldIIlJul0giUq7XSCJSrxdIIlKvV0giUq+XSCJSr9dIIlKwF0giUrBXSCJSsJdIIlKw10giUrEXSCJSsVdIIlKxl0giUrHXSCJSshdIIlKyV0giUrKXR+ISctdIotLzF0jjEvNXR6GSc5du7cgz13yzxPQXefKFtFdr30Q0l2VaRIPXv/0ehBe+edlEV743jgSXvbRGxNe+NYiFF731SIVXvjWIhZe+NYiF1731SEYXvfVIRle+NYhGl741iEbXvjWIhxe+NciHV751yIeXvrZIx9e+tkjIF762iMhXvraIyJe+9okI1762iQkXvvbJSVe+9wlJl783CUnXvzdJihe/N0mKV783SYqXvzeJite/N4mLF783iYtXvzeJi5e/N4nL1793ycwXvzeJzFe/N4nMl783yczXvzfKDRe/eAoNV794Cc2Xv3fJzde/OAnOF794Sc5Xv3fJzpe/eAoO1794Sg8Xv3gJz1e/eEoPl794Sg/Xv3hKEBe/eAoQV794SlCXv3iKUNe/eEoRF794SlFXv3hKEZe/eEoR1794ShIXv3hKEle/eEpSl794ShLXv3hKExe/eEoTV794ShOXv3hKE9e/eEoUF794ShRXv3hKFJe/eEoU1794ShUXv3hKFVe/eEoVl794ShXXv3hKFhe/eEoWV794ShaXv3hKVte/eEpXF794ShdXv3hKF5e/eEoX1794ShgXv3hKGFe/eEoYl794ShjXv3hKGRe/eAoZV794ShmXv3gKGde/eAoaF794ShpXv3hKGpe/eEoa1794ShsXv3hKG1e/eEobl794ChvXv3hKHBe/eEocV794ChyXv3hKHNe/eEodF793yd1Xv3hKHZe+98od17/6Sl4XteyHHlel2MMel6daw97XphkBXxek3lGgV6qmnaCXvTlboNe/fh3hF778WyFXv3iL4Ze/d0lh1783yiIXvzeJ4le/N4nil783ieLXvzeJ4xe+94njV763iiOXvrfKI9e/+QrkF7/6TGRXv/pPZJe7N1Hk162wU6UXm2eT5VeMYVIll4beUGXXhp8PpheH4M/mV4khECaXiOEQJteIYRAnF4ghEGdXiCEQZ5eIIRBn14ehEOgXh6EQqFeHoVCol4dhUKjXh2GQqReHYZCpV4dhkKmXh2FQ6deHYVD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YXkbbjpieRdfLmN5GDQVZHkfNhlleRk0FWx54s1HbXn/8EluefzqTG95+twocHn52CFxefrZI3J5+tkjc3n62iN0efnYInV5+tkjdnn52CJ3efnYInh5+tgjeXn41SJ6efnYI3t5+dcifHn52CN9efjWIn55+dgjf3n51yKAefnYIoF5+NYignn51yKDefjWIoR5+NYihXn41yKGefnWIod5+dkjiHn41iKJefjXIop5+Ncii3n41yKMeffXJI15+dgljnn41yOPefjXI5B5+dkmkXn41yOSefrZJJN5+dkklHn62iWVefraJZZ5+9sll3n62yWYefvcJpl5+9wlmnn73CabefvdJpx5+90nnXn83SeeefzeJ595/d8ooHn93yihef7hKKJ5/uEoo3n+4imkef/jKaV5/+Mppnn/5Cmnef/lKqh5/+UrqXn/5iyqef/nLKt5/+gtrHn/6C2tef/oL655/+gwr3n/6C+wef/pMLF5/+kwsnn/6jCzef/pL7R5/+kutXn/6Sy2ef/pLLd5/+gsuHn/6Su5ef/pKrp5/+kru3n/6Sq8ef/oK715/+grvnn/5yu/ef/mKsB5/+YpwXn/5SnCef/lK8N5/uIpxHn+4CnFefzfKsZ5+Nkox3n42SbIefjXJcl5+NYiynn11ybLedu0G8x5lmIIzXmQXQMQek2HWxF6LINFEnofbDgTeiFoOBR6MItMFXo/pl0WekGqYRd6Q6NfGHpCrGMZekWvZRp6Ra9lG3pErWMcekStZB16P6ZeHno0j08fei59RCB6QKNdIXpVwXMiejycWSN6FFwwJHoZYjUlehliNSZ6GWI1J3oYYTQoehljNSl6Fl4yKnoZZTQrek+xaCx6Zs5+LXpbwXQueiyDRy96HmY5MHohbT4xeiFuPTJ6IGw9M3ohbD00eiBuPTV6H209Nnofbj03eh1tOzh6Gmk2OXo/oFs6el/Jejt6XsV3PHo1jk89eh9uOT56JXU/P3okdT5AeiR1PkF6I3Y9QnojdT1DeiJ2PUR6InY9RXoidj1GeiN2PUd6I3Y8SHoidj5JeiN0PUp6InQ+S3ohdT5MeiJ0P016H3M6TnpFp2BPembNgFB6bdWGUXpu14hSem7Wh1N6X8R5VHoshElVehpqN1Z6HW06V3odbTtYeh1tOll6HW07WnodbTtbeh1sOlx6HG06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acohPo5qyiE9jmvKIT6ObMogPo9tyiE+j27KIT+Pb8ohP49wyiE+j3HKIT6PcsogP5BzyiE/kHTKIUCQdcohP492yiI/j3fKIj+QeMoiP495yiJAkHrKI0GPe8oiQI98yiJAj33KI0KTfsokRJZ/yiVFmIDKIT6RgcojQYiCyiRAd4PKGy5dIcsSQRwiyxMqFCPLHDIcLss0QW4vyyQ9hTDLK0OIMcslPIEyyyA2eTPLIDZ6NMsgNno1yyA2ejbLIDZ6N8sgNno4yyA2eznLIDZ8OssgN3w7yyA3fjzLIDd9PcsgN34+yyA4fj/LIDiAQMsgOH9ByyA5gULLITqCQ8shO4NEyyE7hEXLITqERssgOYJHyyA5gkjLIDqDScsgOoRKyyE6hkvLIDqGTMshO4dNyyE6h07LITuHT8shO4hQyyE7iVHLITuJUssiPYtTyyI9ilTLIj2KVcshPIpWyyE7ilfLITuKWMshPIpZyyE8i1rLITyLW8shPYxcyyE9jF3LITyMXsshPY1fyyE8jGDLIT6OYcsiP45iyyI/j2PLIj+OZMsiPo5lyyI/jmbLIT2NZ8shPY1oyyE9jWnLIT6OasshPo5ryyE9jWzLIT6PbcshPY1uyyE/j2/LIT6OcMshP5BxyyE+jnLLIT+Pc8shPo90yyE/j3XLIj6NdsshPo13yyE+jXjLIj+PecsiPo96yyJAknvLI0GUfMsjQpV9yyE9in7LHTZ4f8sZL2ktzERNbS7MITqEL8wsQ4cwzCY9gjHMHzV6MswgNnozzCA2ejTMIDZ6NcwgNno2zCA2ezfMIDZ7OMwgNns5zCA2fDrMIDZ8O8wgN3w8zCA3fT3MIDd9PswgN30/zCA3fkDMIDh/QcwgOH9CzCA5gUPMIDmBRMwgOYJFzCA5g0bMIDmCR8wgOYNIzCA5gknMIDmDSswgOoRLzCA6hkzMIDqFTcwgOoZOzCA6hk/MITuHUMwhOoZRzCE7iVLMITuIU8whO4lUzCE7iVXMITuJVswhO4lXzCE8iljMITyKWcwhPIpazCE8ilvMITyKXMwhPIpdzCE8jF7MITyLX8whPIxgzCE8i2HMITyMYswhPY1jzCE9jGTMIT2NZcwhPY1mzCE9jWfMIT2NaMwhPY1pzCE9jWrMIT2Na8whPY1szCE9jm3MIT2NbswhPY1vzCE9jnDMIT2N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";var ce=window.gsap,Se=3e4,Wt={ouro:new St(16698112),azul:new St(4158698),branco:new St(14674175),verm:new St(16734810),noite:new St(1562),marinho:new St(666219)};function ds(n){return()=>{n|=0,n=n+1831565813|0;let t=Math.imul(n^n>>>15,1|n);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var $i=(n,t,e)=>n+(t-n)*e,Dr=(n,t,e)=>{let i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)};function Yt(n){return(n()+n()+n()+n()-2)/2}function Me(n,t=7){let e=ds(t),i=new Float32Array(Se*3),s=new Float32Array(Se*3),r=new St;for(let a=0;a<Se;a++){let o=n(a,a/Se,e,r);i[a*3]=o[0],i[a*3+1]=o[1],i[a*3+2]=o[2],s[a*3]=r.r,s[a*3+1]=r.g,s[a*3+2]=r.b}return{pos:i,cor:s}}var Mg={nuvem:()=>Me((n,t,e,i)=>{let s=e()*2-1,r=e()*6.2832,a=Math.sqrt(1-s*s),o=[a*Math.cos(r),s,a*Math.sin(r)],l=Math.sin(o[0]*5+1.3)*Math.cos(o[1]*4-.6)+Math.sin(o[2]*6+o[0]*3)*.6,c=13*(.84+.16*l+.05*Yt(e));return i.copy(Wt.azul).lerp(Wt.ouro,Dr(-.1,1,l+e()*.35)).multiplyScalar(.95),[o[0]*c,o[1]*c,o[2]*c]}),folinha:()=>{let n=Uint8Array.from(atob(ah),e=>e.charCodeAt(0)),t=24/230;return Me((e,i,s,r)=>{let a=0,o=0;for(let f=0;f<8&&(a=Math.floor(s()*27701)*5,r.setRGB(n[a+2]/255,n[a+3]/255,n[a+4]/255,ke),o=r.r*.3+r.g*.59+r.b*.11,!(o>.2||s()<.42));f++);r.multiplyScalar(o>.2?1.25:3.4);let l=n[a]+s()-.5,c=n[a+1]+s()-.5,h=(l-230/2)*t,u=(221/2-c)*t;return[h+Yt(s)*.03,u+Yt(s)*.03,2.4-(h*h+u*u)*.016+Math.min(1,o*1.6)*1.5+Yt(s)*.1]},17)},poeira:()=>Me((n,t,e,i)=>(i.copy(Wt.azul).lerp(Wt.branco,e()*.7).multiplyScalar(.42),e()<.03&&i.copy(Wt.ouro).multiplyScalar(.55),[(e()-.5)*120,(e()-.5)*70,-48+e()*62])),poeiraOuro:()=>Me((n,t,e,i)=>{i.copy(Wt.ouro).lerp(Wt.azul,e()*e()).multiplyScalar(.5);let s=e()*6.2832,r=16+e()*38;return[Math.cos(s)*r*1.5,Math.sin(s)*r*.8,-36+e()*48]}),folha:()=>Me((n,t,e,i)=>{let o=(e()*2-1)*8,l=(e()*2-1)*11;if(e()<.72){let c=Math.floor(e()*24);l=11*.86-c/23*11*1.72+Yt(e)*.07;let h=8*(.92-c*7%5*.13);o=-8*.88+e()*(h+8*.88),i.copy(Wt.branco).multiplyScalar(.95)}else i.copy(Wt.azul).multiplyScalar(.38);return[o,l,Math.sin(o*.22)*.9+Yt(e)*.05]}),serie:()=>{let n=[.2,-.15,.35,.55,.1,.5,.9,.65,1.1,1.35,1,1.6],t=e=>{let i=e*(n.length-1),s=Math.min(n.length-2,Math.floor(i)),r=i-s;return $i(n[s],n[s+1],r*r*(3-2*r))*7-5};return Me((e,i,s,r)=>{let a=s();if(a<.62){let c=s();return r.copy(Wt.ouro),[-14+c*28,t(c)+Yt(s)*.1,Yt(s)*.3]}if(a<.8){let c=Math.floor(s()*12)/11,h=s()*6.28,u=Math.sqrt(s())*.55;return r.copy(Wt.branco),[-14+c*28+Math.cos(h)*u,t(c)+Math.sin(h)*u,0]}if(a<.9)return r.copy(Wt.azul).multiplyScalar(.8),[-14+s()*28,-8+Yt(s)*.05,0];let o=Math.floor(s()*12)/11;r.copy(Wt.azul).multiplyScalar(.4);let l=-8+s()*(t(o)+8);return[-14+o*28+Yt(s)*.05,l,0]})},alvo:()=>Me((n,t,e,i)=>{let s=e(),r=e()*6.2832;if(s<.2){let l=Math.sqrt(e())*2.1;return i.copy(Wt.ouro),[Math.cos(r)*l,Math.sin(r)*l,Yt(e)*.2]}let a=1+Math.floor(e()*4),o=a*3.1+Yt(e)*.12;return i.copy(a%2?Wt.branco:Wt.azul).multiplyScalar(.8),[Math.cos(r)*o,Math.sin(r)*o,Yt(e)*.2]}),cerraai:()=>hh("Cerra.AI",Wt.ouro,300,.0118),grade:()=>lh(0),gradeV:()=>lh(.0448),anel:()=>Me((n,t,e,i)=>{let s=t*6.2832,r=11+Yt(e)*.55,a=Yt(e)*.55;return i.copy(Wt.ouro).lerp(Wt.verm,Math.abs(Math.sin(s*.5))*.75),[Math.cos(s-1.57)*r,Math.sin(s-1.57)*r,a]}),linha:()=>Me((n,t,e,i)=>(i.copy(Wt.ouro),[-17+t*34,Yt(e)*.34-2,Yt(e)*.34])),casa:()=>Me((n,t,e,i)=>(i.copy(Wt.ouro).lerp(Wt.azul,e()).multiplyScalar(.9),[(e()-.5)*17,(e()-.5)*17,(e()-.5)*17])),fluxo:()=>Me((n,t,e,i)=>{let s=e(),r=.6+s*3.2,a=[9,19,-8];if(e()<.28){let o=e()*2-1,l=e()*6.28,c=Math.sqrt(1-o*o),h=5.5*Math.cbrt(e());return i.copy(Wt.verm).multiplyScalar(.85),[a[0]+c*Math.cos(l)*h*1.6,a[1]+o*h,a[2]+c*Math.sin(l)*h]}return i.copy(Wt.ouro).lerp(Wt.verm,s),[a[0]*s+Yt(e)*r,a[1]*s*s+Yt(e)*r+Math.sin(s*3.14)*2.5,a[2]*s+Yt(e)*r]}),bumerangue:()=>Me((n,t,e,i)=>{if(e()<.24){let o=e()*6.2832;return i.copy(Wt.azul).multiplyScalar(.8),[Math.cos(o)*15+Yt(e)*.12,Math.sin(o)*8.5+Yt(e)*.12,Math.sin(o)*4]}let s=e()*2-1,r=Math.hypot(16*s,9),a=1.8*(1-.72*Math.abs(s))*(e()*2-1);return i.copy(Wt.ouro).lerp(Wt.branco,Math.abs(s)*.35),[9*s+16*s/r*a,3.6-8*s*s+9/r*a,Yt(e)*.25]}),chegada:()=>Me((n,t,e,i)=>{if(e()<.42)return i.copy(Wt.ouro).multiplyScalar(.95),[(e()-.5)*13,(e()-.5)*13,(e()-.5)*13];let s=e(),r=.4+(1-s)*2.6;return i.copy(Wt.branco).lerp(Wt.ouro,s),[9*(1-s)+Yt(e)*r,19*(1-s)*(1-s)+Yt(e)*r,-8*(1-s)+Yt(e)*r]}),nos:()=>{let n=ds(21),t=Array.from({length:11},()=>[(n()-.5)*8.6,(n()-.5)*8.6,(n()-.5)*8.6]);return Me((e,i,s,r)=>{let a=t[Math.floor(s()*11)];if(s()<.42){let o=t[Math.floor(s()*11)],l=s();return r.copy(Wt.azul).multiplyScalar(.7),[$i(a[0],o[0],l),$i(a[1],o[1],l),$i(a[2],o[2],l)]}return r.copy(Wt.ouro),[a[0]+Yt(s)*.7,a[1]+Yt(s)*.7,a[2]+Yt(s)*.7]})},assinatura:()=>{let n=[[-20,-1],[-18,5],[-16.2,7.6],[-15.4,3],[-15,-5.5],[-14,-2],[-12.2,3.4],[-11,.4],[-10,-2],[-8.8,1.6],[-7.4,3.2],[-6.6,-1.2],[-5,-2.2],[-3.4,2.4],[-2.2,-1.8],[-.4,2],[1.2,-1.6],[3,2.6],[4.8,-1.2],[7,1.4],[9.5,-.4],[13,1.2],[17,-.8],[21,.8],[14,-3.6],[2,-5],[-10,-4.4],[-19,-2.2]],e=new kn(n.map(s=>new P(s[0],s[1],0)),!1,"centripetal").getSpacedPoints(Se-1),i=Me((s,r,a,o)=>{let l=e[s];return o.copy(Wt.ouro),[l.x*.62+Yt(a)*.11,l.y*.62+Yt(a)*.11,Yt(a)*.1]});return i.ordem=!0,i}};function lh(n){let t=Math.ceil(Math.sqrt(Se*16/9)),e=Math.ceil(Se/t);return Me((i,s,r,a)=>(r()<n?a.copy(Wt.verm).multiplyScalar(2.2):a.copy(Wt.azul).lerp(Wt.branco,.5).multiplyScalar(1.05),[(i%t/t-.5)*44,(Math.floor(i/t)/e-.5)*25,0]),11)}function hh(n,t=Wt.ouro,e=430,i=.032){let s=document.createElement("canvas");s.width=1800,s.height=620;let r=s.getContext("2d",{willReadFrequently:!0});r.fillStyle="#fff",r.textAlign="center",r.textBaseline="middle",r.font=`900 ${e}px Inter, sans-serif`,r.fillText(n,900,320);let a=r.getImageData(0,0,1800,620).data,o=[];for(let c=0;c<620;c+=2)for(let h=0;h<1800;h+=2)a[(c*1800+h)*4+3]>128&&o.push(h,c);let l=o.length/2;return Me((c,h,u,f)=>{let p=Math.floor(u()*l)*2;return f.copy(t).multiplyScalar(.75+u()*.3),[(o[p]-900)*i+Yt(u)*.04,(320-o[p+1])*i+Yt(u)*.04,Yt(u)*.5]})}var ue={f:"poeira",a:.55,t:.5,s:1},us=[0,0,60],ch={capa:[{f:"folinha",p:[20,0,0],rot:[-.06,-.26,0],osc:.3,t:.03,s:1.9,a:1}],numero:[{f:"txt:+10%",p:[0,4.5,0],t:.08,s:1.7,a:1},{f:"poeiraOuro",p:[0,0,0],t:1.1,a:.5},{f:"poeiraOuro",p:[0,0,0],t:1.1,a:.5},{f:"poeiraOuro",p:[0,0,0],t:1.1,a:.34}],tese:[{f:"nuvem",p:[24,-1,0],giro:.06,a:.6,t:.3},{f:"alvo",p:[24,0,0],osc:.12,a:.9,t:.05}],caminho:[ue],bio:[{f:"poeira",a:.45,t:.5}],...Object.fromEntries([1,2,3,4,5].map(n=>["cap"+n,[{f:"txt:"+n,p:[23,0,0],t:.08,a:.95,s:1.5}]])),camadas3:[{f:"folha",p:[17,0,0],rot:[-.12,-.55,.08],osc:.1,t:.03,a:.85},{f:"folha",p:[17,0,0],rot:[-.12,-.55,.08],osc:.1,t:.03,a:.85},{f:"serie",p:[16,1,0],rot:[0,-.28,0],osc:.1,t:.02,a:.95},{f:"alvo",p:[17,0,0],rot:[0,-.25,0],osc:.14,t:.03,a:.95},{f:"alvo",p:[17,0,0],rot:[0,-.25,0],osc:.14,t:.03,a:.95}],quatro:[0,1,2,3,4].map(n=>({...ue,a:.25,ato:"camadas",ap:{ativa:n-1,vistas:n},cam:[4,15,60],mira:[0,0,0]})),escada:[0,1,2,3,4,5,5].map(n=>({...ue,a:.25,ato:"escada",ap:{nivel:n},cam:[-6,13,60],mira:[0,0,0]})),erros:[ue],movimentos:[0,0,0,1,1].map(n=>({f:n?"nos":"poeira",a:n?.95:.4,t:n?.06:.5,p:n?[23,0,0]:[0,0,0],ato:"caixa",ap:{abre:n,x:23}})),estudos348:[{...ue,a:.25,ato:"pontos",ap:{k:0,t:0,x:21}},{...ue,a:.25,ato:"pontos",ap:{k:8,t:1,x:21}},{...ue,a:.25,ato:"pontos",ap:{k:8,t:1,x:21}}],fronteira:[0,1,2,2,2].map(n=>({...ue,a:.2,ato:"fronteira",ap:{tarefas:n},cam:[0,24,54],mira:[0,0,0]})),percepcao:[{f:"poeira",a:.4,t:.5},{f:"poeira",a:.4},{f:"poeiraOuro",a:.3,t:1.3}],evidencia:[ue],dono:[{f:"txt:?",p:[24,1,0],t:.08,a:.95,s:1.5}],producao:[{...ue,a:.25,ato:"pontos",ap:{k:0,t:0,x:21,n:343}},{...ue,a:.25,ato:"pontos",ap:{k:0,t:0,x:21,n:343}},{...ue,a:.25,ato:"pontos",ap:{k:14,t:1,x:21,n:343}},{...ue,a:.25,ato:"pontos",ap:{k:14,t:1,x:21,n:343}}],curva:[0,1,2,3,4,5,5].map(n=>({...ue,a:.25,ato:"escada",ap:{nivel:n},cam:[-6,13,60],mira:[0,0,0]})),bumerangue:[{f:"bumerangue",p:[21,1,0],rot:[-.25,-.25,.32],osc:.16,t:.06,a:.9,s:1.2}],quemvende:[0,1,2,3].map(()=>({f:"chegada",p:[20,-5,0],a:.85,t:.3,s:1.1,ato:"casinha",ap:{x:20,y:-5},cam:[-6,7,62],mira:[0,0,0]})).concat([{f:"serie",p:[23,1,0],rot:[0,-.28,0],osc:.1,t:.02,a:.95}]),areas:[ue],limite:[ue],revisao:[{f:"poeiraOuro",a:.32,t:1.2}],contratos:[{f:"grade",p:[24,0,-4],rot:[0,-.45,0],osc:.07,t:.02,a:1,s:1.7},{f:"gradeV",p:[24,0,-4],rot:[0,-.45,0],osc:.07,t:.02,a:1,s:1.7},{f:"gradeV",p:[24,0,-4],rot:[0,-.45,0],osc:.07,t:.02,a:.7,s:1.7}],determinantes:[ue],publicopilot:[{f:"folha",p:[24,0,0],rot:[-.12,-.55,.08],osc:.1,t:.03,a:.85},{f:"folha",p:[24,0,0],rot:[-.12,-.55,.08],osc:.1,t:.03,a:.9},{f:"alvo",p:[24,0,0],rot:[0,-.25,0],osc:.14,t:.03,a:.95},{f:"nos",p:[24,0,0],osc:.25,t:.06,a:.95,s:1.3},{f:"folha",p:[24,0,0],rot:[-.12,-.55,.08],osc:.1,t:.03,a:.9},{f:"folha",p:[24,0,0],rot:[-.12,-.55,.08],osc:.1,t:.03,a:.9}],artefato:[{f:"nos",a:.95,t:.06,p:[23,0,0],ato:"caixa",ap:{abre:0,x:23}},{f:"nos",a:.95,t:.06,p:[23,0,0],ato:"caixa",ap:{abre:1,x:23}},{f:"nos",a:.95,t:.06,p:[23,0,0],ato:"caixa",ap:{abre:1,x:23}}],correcao:[{f:"anel",p:[0,0,0],giro:.12,a:.32,t:.1},{f:"linha",p:[0,-9,0],a:.9,t:.02},{f:"linha",p:[0,-9,0],a:.9,t:.02},{f:"linha",p:[0,-9,0],a:.9,t:.02},{f:"linha",p:[0,-9,0],a:.1,t:.02}],casa:[{f:"fluxo",p:[19,-5,0],a:.85,t:.4,ato:"casinha",ap:{x:19,y:-5},cam:[-6,7,62],mira:[0,0,0]},{f:"casa",p:[19,-3,0],a:.85,t:.3,ato:"casinha",ap:{x:19,y:-3},cam:[-6,7,62],mira:[0,0,0]},{f:"casa",p:[19,-3,0],a:.6,t:.3,ato:"casinha",ap:{x:19,y:-3},cam:[-6,7,62],mira:[0,0,0]},{f:"casa",p:[19,-3,0],a:.6,t:.3,ato:"casinha",ap:{x:19,y:-3},cam:[-6,7,62],mira:[0,0,0]}],offline:[0,1,2,3,4].map(()=>({f:"nos",p:[19.5,-1,0],a:.95,t:.06,s:1.3,ato:"casinha",ap:{x:19.5,y:-1},cam:[-6,7,62],mira:[0,0,0]})),cerraai:[{f:"cerraai",p:[23.5,0,0],osc:.1,t:.05,a:1,s:1.15}],rag:[ue],costura:[-1,0,1,2,-1].map(n=>({...ue,a:.25,ato:"aneis",ap:{ativo:n,x:17}})),regras:[ue],checklist:[{f:"poeira",a:.4}],passos:[ue],recado:[{f:"poeiraOuro",a:.32,t:1.2},{f:"poeiraOuro",a:.32,t:1.2},{f:"poeiraOuro",a:.32,t:1.2},{f:"poeiraOuro",a:.3,t:1.2},{f:"assinatura",p:[0,-8.6,0],a:1,t:.01,s:.85,revela:1}],obrigado:[{f:"nuvem",p:[0,1,-26],giro:.08,a:.3,t:.25}]},Tg={f:"poeira",a:.55,t:.5,s:1,p:[0,0,0],rot:[0,0,0],giro:0,osc:0,cam:us,mira:[0,0,0],ato:null,ap:{},revela:1};function bg(n,t={}){let e=!!t.instantaneo,i=new cr({canvas:n,antialias:!1,powerPreference:"high-performance"});i.setClearColor(Wt.noite,1),i.toneMapping=ri;let s=new Un;s.background=Wt.noite,s.fog=new hr(1562,.009);let r=new Pe(35,16/9,1,400);r.position.set(...us);let a=new P,o=new An(i);s.environment=o.fromScene(new Gr,.04).texture,s.environmentIntensity=.45,s.add(new br(9416959,330272,.9));let l=new Pr(16777215,2.2);l.position.set(-16,30,26),s.add(l);let c=new Nn(16698112,500,90);c.position.set(24,8,20),s.add(c);let h=new ve,u=new Float32Array(Se*3),f=new Float32Array(Se*3),p=new Float32Array(Se*3),g=new Float32Array(Se*3),y=new Float32Array(Se),m=new Float32Array(Se),d=ds(99);for(let et=0;et<Se;et++)y[et]=d();h.setAttribute("position",new de(u,3)),h.setAttribute("aPara",new de(f,3)),h.setAttribute("aCorDe",new de(p,3)),h.setAttribute("aCorPara",new de(g,3)),h.setAttribute("aSem",new de(y,1)),h.setAttribute("aOrdem",new de(m,1));let b={uMix:{value:1},uT:{value:0},uTurb:{value:.4},uTam:{value:1},uAlfa:{value:0},uRevela:{value:1},uPx:{value:1}},T=new fe({uniforms:b,transparent:!0,depthWrite:!1,blending:vn,vertexShader:`uniform float uMix,uT,uTurb,uTam,uAlfa,uRevela,uPx; attribute vec3 aPara,aCorDe,aCorPara; attribute float aSem,aOrdem; varying vec3 vCor; varying float vA;
    void main(){ float m=smoothstep(aSem*.35,aSem*.35+.65,uMix); vec3 p=mix(position,aPara,m); float arco=4.*m*(1.-m); float s=aSem*6.2832;
      p+=vec3(sin(uT*.55+s*3.+p.y*.2),cos(uT*.47+s*5.+p.x*.2),sin(uT*.39+s*7.+p.z*.2))*(uTurb+arco*5.);
      vCor=mix(aCorDe,aCorPara,m); vA=uAlfa*(1.-smoothstep(uRevela-.012,uRevela,aOrdem));
      vec4 mv=modelViewMatrix*vec4(p,1.); gl_PointSize=uTam*uPx*(40.+26.*fract(aSem*13.))/-mv.z; gl_Position=projectionMatrix*mv; }`,fragmentShader:"varying vec3 vCor; varying float vA; void main(){ float d=length(gl_PointCoord-.5); if(d>.5)discard; gl_FragColor=vec4(vCor,vA*smoothstep(.5,.12,d)); }"}),E=new mr(h,T);E.frustumCulled=!1,s.add(E);let N={};function _(et){return N[et]?N[et]:N[et]=et.startsWith("txt:")?hh(et.slice(4)):Mg[et]()}let w=null;function F(et,R){let Mt=_(et),Q=b.uMix.value;for(let it=0;it<Se;it++){let $=Dr(y[it]*.35,y[it]*.35+.65,Q);for(let Tt=0;Tt<3;Tt++){let st=it*3+Tt;u[st]=$i(u[st],f[st],$),p[st]=$i(p[st],g[st],$),f[st]=Mt.pos[st],g[st]=Mt.cor[st]}m[it]=Mt.ordem?it/Se:0}for(let it of["position","aPara","aCorDe","aCorPara","aOrdem"])h.attributes[it].needsUpdate=!0;ce.killTweensOf(b.uMix),b.uMix.value=0,w=et,R?ce.to(b.uMix,{value:1,duration:R,ease:"power2.inOut"}):b.uMix.value=1}let M={};function I(et,R,Mt){R.visible=!1,R.userData.a={v:0},s.add(R),M[et]={grupo:R,aplicar:Mt||(()=>{})}}function C(et,R){et.traverse(Mt=>{if(Mt.material){let Q=Mt.material.userData.base??(Mt.material.userData.base=Mt.material.opacity);Mt.material.transparent=!0,Mt.material.opacity=Q*R}}),et.visible=R>.004}let Z=(et,R,Mt=1)=>new pr(new yr(et),new os({color:R,transparent:!0,opacity:Mt})),z=new St(14263296),V=new St(1194636),q=()=>new De({color:1194636,roughness:.42,metalness:.35,transparent:!0});{let et=new _e,R=[],Mt=new Je(5,1,9).translate(0,.5,0);for(let it=0;it<5;it++){let $=new Jt(Mt,q());$.material.emissive=new St(16698112),$.material.emissiveIntensity=0;let Tt=Z(Mt,16698112,.9),st=new _e;st.add($,Tt),st.position.set(5.3*it-2,-11,0),st.scale.y=.001,et.add(st),R.push({d:st,h:(it+1)*3.6})}let Q=new Jt(new Hn(1.15,32,24),new De({color:16698112,emissive:16698112,emissiveIntensity:1.4,roughness:.3}));Q.position.set(-2,-9,0),et.add(Q),et.rotation.y=-.42,et.position.set(16,1.5,0),et.scale.setScalar(.66),I("escada",et,(it,$)=>{R.forEach((v,x)=>{ce.to(v.d.scale,{y:x<it.nivel?v.h:.001,duration:$*.9,ease:"power3.out",delay:$*.05});let H=v.d.children[0].material,W=x===it.nivel-1,j=W?z:V;ce.to(H.color,{r:j.r,g:j.g,b:j.b,duration:$}),ce.to(H,{emissiveIntensity:W?.22:0,duration:$})});let Tt=Math.max(0,it.nivel-1),st=it.nivel?R[Tt].h-11+1.15:-9;ce.to(Q.position,{x:5.3*Tt-2,y:st,duration:$,ease:"back.out(1.5)"})})}{let et=new _e,R=[],Mt=new Je(20,.55,13);for(let Q=0;Q<4;Q++){let it=new Jt(Mt,q());it.material.emissive=new St(16698112),it.material.emissiveIntensity=0;let $=Z(Mt,Q===3?16698112:9416959,.85),Tt=new _e;Tt.add(it,$),Tt.position.y=Q*.9-2,Tt.scale.setScalar(.001),et.add(Tt),R.push({d:Tt,m:it})}et.position.x=21,et.rotation.y=.5,et.scale.setScalar(.72),I("camadas",et,(Q,it)=>R.forEach(($,Tt)=>{ce.to($.d.position,{y:Tt*(Q.vistas>=4?5:.9+Q.vistas*.9)-7,duration:it,ease:"power3.inOut"}),ce.to($.d.scale,{x:Tt<Q.vistas?1:.001,y:Tt<Q.vistas?1:.001,z:Tt<Q.vistas?1:.001,duration:it*.8,ease:"power3.out"});let st=Tt===Q.ativa,v=st?z:V;ce.to($.m.material.color,{r:v.r,g:v.g,b:v.b,duration:it}),ce.to($.m.material,{emissiveIntensity:st?.22:0,duration:it})}))}{let et=new _e,R=new Je(14,14,14),Mt=new Jt(R,new vr({color:198159,roughness:.25,metalness:.75,clearcoat:1,transparent:!0})),Q=Z(R,16698112,.95);et.add(Mt,Q),et.userData.gira=.18;let it={v:1};I("caixa",et,($,Tt)=>{ce.to(et.position,{x:$.x,duration:Tt,ease:"power3.inOut"}),ce.to(it,{v:1-$.abre,duration:Tt*1.3,ease:"power2.inOut",onUpdate(){Mt.material.userData.base=.04+it.v*.96},onComplete(){Mt.material.userData.base=.04+it.v*.96}}),Tt||(Mt.material.userData.base=.04+(1-$.abre)*.96)})}{let Mt=new as(new Hn(.34,16,12),new De({roughness:.4,transparent:!0}),348),Q=ds(5),it=[...Array(348).keys()].sort(()=>Q()-.5),$=new Int32Array(348);it.forEach((D,ct)=>$[D]=ct);let Tt=new St(3494031),st=new St(16698112).multiplyScalar(1.15),v=new St,x=new me,H={t:0,k:0,n:348},W=()=>{for(let D=0;D<348;D++){let ct=$[D]<H.k,at=D>=H.n,lt=(D%29-29/2+.5)*1.12,pt=(Math.floor(D/29)-5.5)*1.3;x.position.set(lt,pt+(ct?Math.sin(D)*0:0),-lt*lt*.035+(ct?2.2*H.t:0));let X=at?1e-4:1+(ct?H.t*.85:0);x.scale.setScalar(X),x.updateMatrix(),Mt.setMatrixAt(D,x.matrix),v.copy(Tt).lerp(ct?st:Tt,H.t).multiplyScalar(ct?1:$i(1,.55,H.t)),Mt.setColorAt(D,v)}Mt.instanceMatrix.needsUpdate=!0,Mt.instanceColor&&(Mt.instanceColor.needsUpdate=!0)};W();let j=new _e;j.add(Mt),j.rotation.y=-.2,j.scale.setScalar(.62),I("pontos",j,(D,ct)=>{ce.to(j.position,{x:D.x||0,duration:ct,ease:"power3.inOut"}),H.k=D.k,H.n=D.n||348,ce.killTweensOf(H,"t"),ct?ce.to(H,{t:D.t,duration:ct*1.2,ease:"power2.out",onUpdate:W,onStart:W}):(H.t=D.t,W())})}{let et=pt=>14+3.4*Math.abs(pt*3.2%2-1)*2+2.6*Math.abs((pt*7.3+1)%2-1)*2-3,R=pt=>et(pt<0?pt+6.2832:pt),Mt=new wn(76,60,190,150).rotateX(-1.5708),Q=Mt.attributes.position,it=new Float32Array(Q.count*3),$=new St;for(let pt=0;pt<Q.count;pt++){let X=Q.getX(pt),ot=Q.getZ(pt),bt=Math.atan2(ot,X),At=Math.hypot(X,ot)/R(bt),It=(1-Dr(.97,1.03,At))*3.4;Q.setY(pt,It),$.set(At<1?731762:332339),At>=1&&$.multiplyScalar(1-Dr(1.03,1.45,At)),At>.985&&At<1.03&&$.set(9071104),it.set([$.r,$.g,$.b],pt*3)}Mt.setAttribute("color",new de(it,3)),Mt.computeVertexNormals();let Tt=new Jt(Mt,new Mr({vertexColors:!0,flatShading:!0,transparent:!0})),st=new kn(Array.from({length:480},(pt,X)=>{let ot=X/480*6.2832-3.1416,bt=R(ot);return new P(Math.cos(ot)*bt,3.7,Math.sin(ot)*bt)}),!0),v=new Jt(new Ir(st,700,.1,6,!0),new oi({color:new St(16698112),transparent:!0})),x=ds(31),H=(pt,X,ot)=>{let bt=new as(new Hn(.55,16,12),new De({color:X,emissive:X,emissiveIntensity:.45,transparent:!0}),pt);return bt.userData.pos=Array.from({length:pt},ot),bt},W=H(38,16698112,()=>{let pt=x()*6.28-3.14,X=Math.sqrt(x())*.84;return[Math.cos(pt)*R(pt)*X,4.1,Math.sin(pt)*R(pt)*X]}),j=H(30,16734810,()=>{let pt=x()*6.28-3.14,X=1.14+x()*.34;return[Math.cos(pt)*R(pt)*X,.6,Math.sin(pt)*R(pt)*X]}),D=new me,ct=(pt,X)=>{pt.userData.pos.forEach((ot,bt)=>{D.position.set(...ot),D.scale.setScalar(Math.max(1e-4,X)),D.updateMatrix(),pt.setMatrixAt(bt,D.matrix)}),pt.instanceMatrix.needsUpdate=!0};ct(W,0),ct(j,0);let at=new _e;at.add(Tt,v,W,j),at.position.set(18.5,-2,0),at.scale.setScalar(.6),at.userData.gira=.05;let lt={d:0,f:0};I("fronteira",at,(pt,X)=>{let ot=pt.tarefas>=1?1:0,bt=pt.tarefas>=2?1:0;X?ce.to(lt,{d:ot,f:bt,duration:X,ease:"back.out(2)",onUpdate(){ct(W,lt.d),ct(j,lt.f)}}):(lt.d=ot,lt.f=bt,ct(W,lt.d),ct(j,lt.f))})}{let et=new _e,R=new Sr(7.2,.62,28,180),Mt=[16698112,15134207,5013744].map((Q,it)=>{let $=new Jt(R,new De({color:Q,metalness:.85,roughness:.24,emissive:Q,emissiveIntensity:0,transparent:!0}));return $.rotation.set(it*1.05+.4,it*.9-.4,it*.5),$.position.set(Math.cos(it*2.094)*3,Math.sin(it*2.094)*3,0),et.add($),$});et.userData.gira=.16,I("aneis",et,(Q,it)=>{ce.to(et.position,{x:Q.x,duration:it,ease:"power3.inOut"}),Mt.forEach(($,Tt)=>ce.to($.material,{emissiveIntensity:Tt===Q.ativo?.55:0,duration:it}))})}{let et=new _e,R=new Je(19,19,19);et.add(new Jt(R,new De({color:666219,opacity:.1,transparent:!0,depthWrite:!1})),Z(R,16698112,1)),et.userData.gira=.05,I("casinha",et,(Mt,Q)=>ce.to(et.position,{x:Mt.x,y:Mt.y,duration:Q,ease:"power3.inOut"}))}let J=new Ee(4,4,{type:ze,samples:4}),tt=new Fr(i,J);tt.addPass(new Nr(s,r));let B=new Dn(new Et(960,540),.55,.6,.62);tt.addPass(B),tt.addPass(new Or);let ut=[{bloom:!0,pr:1,n:Se},{bloom:!1,pr:1,n:Se},{bloom:!1,pr:.75,n:2e4},{bloom:!1,pr:.6,n:12e3}],xt=0,Rt=1;function Nt(et=Rt){Rt=et;let R=ut[xt],Mt=Math.min(window.devicePixelRatio||1,1.5)*R.pr,Q=Math.round(1920*Rt*Mt),it=Math.round(1080*Rt*Mt);i.setPixelRatio(1),i.setSize(Q,it,!1),tt.setPixelRatio(1),tt.setSize(Q,it),b.uPx.value=it/1080*1.55,B.enabled=R.bloom,h.setDrawRange(0,R.n)}let Ut={px:0,py:0,pz:0,rx:0,ry:0,rz:0,cx:us[0],cy:us[1],cz:us[2],mx:0,my:0,mz:0,giro:0,osc:0,gv:0,ligado:!0},Y=null;function nt(et,R){let Mt=ch[et]||[ue],Q={...Tg,...Mt[Math.min(R,Mt.length-1)]},it=e?0:1.5;w!==Q.f&&F(Q.f,e?0:1.6);let $=(Tt,st,v=it)=>v?ce.to(Tt,{...st,duration:v,ease:"power3.inOut",overwrite:"auto"}):ce.set(Tt,st);$(b.uTurb,{value:Q.t}),$(b.uTam,{value:Q.s}),$(b.uAlfa,{value:Q.a}),it&&Q.revela===1&&ch[et]&&Q.f==="assinatura"?(b.uRevela.value=0,ce.to(b.uRevela,{value:1.02,duration:3.2,delay:1.1,ease:"power1.inOut",overwrite:!0})):(ce.killTweensOf(b.uRevela),b.uRevela.value=1.02),$(Ut,{px:Q.p[0],py:Q.p[1],pz:Q.p[2],rx:Q.rot[0],ry:Q.rot[1],rz:Q.rot[2],cx:Q.cam[0],cy:Q.cam[1],cz:Q.cam[2],mx:Q.mira[0],my:Q.mira[1],mz:Q.mira[2],osc:Q.osc,gv:Q.giro});for(let[Tt,st]of Object.entries(M)){let v=Tt===Q.ato;v&&(M[Tt].grupo.visible=!0,st.aplicar(Q.ap,it));let x=st.grupo.userData.a;it?ce.to(x,{v:v?1:0,duration:v?.9:.55,ease:"power2.inOut",overwrite:!0,onUpdate(){C(st.grupo,x.v)},onComplete(){C(st.grupo,x.v)}}):(x.v=v?1:0,C(st.grupo,x.v))}Y=Q.ato,it||(Ut.giro=0,Zt(0),tt.render())}let vt=0,dt=performance.now(),kt=0,Ht=performance.now(),Ot=60,ie=0;function Zt(et){vt+=et,b.uT.value=vt,Ut.giro+=Ut.gv*et,Ut.gv||(Ut.giro*=Math.pow(.02,et)),E.position.set(Ut.px,Ut.py,Ut.pz),E.rotation.set(Ut.rx,Ut.ry+Ut.giro+Math.sin(vt*.25)*Ut.osc,Ut.rz);let R=e?0:Math.sin(vt*.13)*.9,Mt=e?0:Math.cos(vt*.11)*.55;r.position.set(Ut.cx+R,Ut.cy+Mt,Ut.cz),a.set(Ut.mx,Ut.my,Ut.mz),r.lookAt(a);for(let Q of Object.values(M))Q.grupo.visible&&Q.grupo.userData.gira&&(Q.grupo.rotation.y+=Q.grupo.userData.gira*et);M.caixa.grupo.visible&&(M.caixa.grupo.rotation.x=.35)}return i.setAnimationLoop(()=>{if(!Ut.ligado||e)return;let et=performance.now(),R=Math.min(.05,(et-dt)/1e3);dt=et,Zt(R),tt.render(),kt++,et-Ht>2e3&&(Ot=kt*1e3/(et-Ht),kt=0,Ht=et,ie++,ie>1&&Ot<42&&xt<ut.length-1&&!document.hidden&&(xt++,Nt(),ie=0))}),Nt(),{cena:nt,ajustar:Nt,info:()=>({fps:Math.round(Ot),nivel:xt,draw:i.info.render.calls}),ligar(et){Ut.ligado=et,n.style.visibility=et?"visible":"hidden"},get ligado(){return Ut.ligado},pronto:_("nuvem")&&!0,renderizarAgora(){Zt(0),tt.render()}}}return Sh(Rg);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
