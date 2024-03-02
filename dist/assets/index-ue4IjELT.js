(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function p(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(t){if(t.ep)return;t.ep=!0;const o=p(t);fetch(t.href,o)}})();const y=document.querySelector("#income"),S=document.querySelector("#expense"),v=document.querySelector("#budget"),b=document.querySelector("#edit-budget"),I=document.querySelector("#new-record"),L=document.querySelector("#close-budget"),u=document.querySelector("#form-budget"),q=document.querySelector("#close-record"),f=document.querySelector("#form-record"),h=document.querySelector("#budget-in-form"),s=document.querySelector("#new-budget");let i=parseInt(localStorage.getItem("totalIncome"))||0,a=parseInt(localStorage.getItem("totalExpense"))||0,r=parseInt(localStorage.getItem("totalBudget"))||0;function m(){const e=n=>"$"+n.toLocaleString("en-us");y.textContent=i===0?"-":e(i),S.textContent=a===0?"-":e(a),v.textContent=r===0?"-":e(r)}m();function c(e){e.classList.toggle("hidden")}b.addEventListener("click",()=>{c(u),h.textContent=r===0?"-":`$${r.toLocaleString()}`,s.focus()});I.addEventListener("click",()=>{c(f)});q.addEventListener("click",e=>{e.preventDefault(),c(f)});L.addEventListener("click",e=>{e.preventDefault(),c(u)});s.addEventListener("input",function(){let e=this.value.replace(/\D/g,"");+e<1?this.value="":(e=e.replace(/\B(?=(\d{3})+(?!\d))/g,","),e="$"+e,this.value=e)});const g=document.querySelector("#submit-budget");g.addEventListener("click",e=>{e.preventDefault(),r=parseInt(s.value.replace(/\D/g,"")),!(isNaN(r)||r<1)&&(m(),c(u),localStorage.setItem("totalBudget",r))});u.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),g.click())});
