(function(){var e={"á":"a","é":"e","í":"i","ó":"o","ú":"u","ü":"u","ñ":"n"},t=function(t){var n=0;if(!t)return"";var r="";for(n=0;n<t.length;n++)r+=e[t.charAt(n)]||t.charAt(n);return r},n=function(e,n){var r,i=0,s="";for(r=0,i=n.length;r<i;++r){n[r].style.color="black";n[r].style.fontWeight="400"}for(r=0,i=n.length;r<i;++r){s=t(n[r].innerHTML.toLowerCase());for(var o=0,u=e.length;o<u;++o)if(s===e[o]){n[r].style.color="green";n[r].style.fontWeight="700"}}},r=function(e){e=e.replace("&nbsp;"," ");e=e.replace(/\s{2,}/," ");e=e.replace(/^\s{1,}/,"");e=e.replace(/\s{1,}$/,"");e=e.replace(/\.$/,"");return e},i,s,o,u,a,f=0,l=[],c=[],h="",p="",d=[],v=[],m=[],g=0,y=[],b=["forward","reverse"];for(o=0,f=b.length;o<f;++o){c=[];y=[];l=document.getElementById(b[o]).getElementsByClassName("accepted-translation");y=document.getElementById(b[o]).getElementsByClassName("report-suggestion");for(i=0,u=l.length;i<u;++i){p=l[i].innerHTML;if(p.length>0){h=p.replace(/<span class="syntax">/gi,"");h=h.replace(/<\/span>/gi,"");d=h.match(/\[[^\]]*\]/g)||[];if(d.length===0){h=r(h);c.push(h.toLowerCase())}else{m=[];g=0;v=[];var w=[];a=d.length;for(s=0;s<a;s++){g=d[s].split("/").length;var E=d[s].substr(1,d[s].length-2);v.push(E.split("/"));m.push(g);w.push(0)}var S=m[0],x=0;for(s=1;s<a;s++)S*=m[s];var T="",N=!1;while(!N){T=h;for(s=0;s<a;s++)T=T.replace(/\[[^\]]*\]/,v[s][w[s]]);T=r(T);c.push(t(T.toLowerCase()));for(s=0;s<a;s++){if(w[s]<m[s]-1){w[s]++;break}w[s]===m[s]-1&&(w[s]=0)}x++;S===x&&(N=!0)}}}}c!==[]&&n(c,y)}})();