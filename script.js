let select=document.querySelectorAll("select");
let audio=new Audio("alarm.wav")
for(i=1;i<=12;i++){
   i=i<10?"0"+i:i;
   let option=`<option value=${i}>${i}</option>`
   select[0].firstElementChild.insertAdjacentHTML("beforebegin",option)
}
for(i=0;i<=59;i++){
    i=i<10?"0"+i:i;
    let option=`<option value=${i}>${i}</option>`
    select[1].firstElementChild.insertAdjacentHTML("beforebegin",option)
 }
 for(i=1;i<=2;i++){
    let option=i<2?`<option value="pm">pm</option>`:`<option value="am">am</option>`
    select[2].firstElementChild.insertAdjacentHTML("beforebegin",option)
 }
 let img=`<img src="vec.gif" alt="" class="img">`
 let alarmlist=[];
 let list;
 let hour;
 let min;
 let med;
 let sec;
 function check(){   
list=document.querySelectorAll(".alarm");
 list.forEach(e=>{
      if(e.querySelector("input").checked){
             if(alarmlist.indexOf(e.querySelector("h2").innerHTML)<0){
               alarmlist.push(e.querySelector("h2").innerHTML)
             } 
            }
            else{
               alarmlist=alarmlist.filter(item=> item!=e.querySelector("h2").innerHTML)
             }
   }) }
 function set(){
   hour_l=parseInt(document.getElementById("hrs").value);
   min_l=parseInt(document.getElementById("min").value);
   med_l=document.getElementById("am/pm").value;

   if(hour_l>0&&min_l>=0&&med_l=="am"||med_l=="pm")
   {
      document.getElementById("clear").style="display:initial;";
      const element = document.getElementsByClassName("alarms");
      if (element.length == 0){ 
         let alarms = document.createElement("div");
           alarms.classList.add("alarms");
           alarms.setAttribute("id", "alarms");

         document.querySelector("#set").insertAdjacentElement("afterend", alarms);
         alarms.style.display="initial"
      }
      let alarm = `
         <div class="alarm">
         <h2>${hour_l < 10 ? "0" + hour_l : hour_l}:${min_l < 10 ? "0" + min_l : min_l} ${med_l}</h2>
         <label class="switch">
         <input type="checkbox" onclick="check()" checked>
         <span class="slider round"></span>
         </label> 
         <button id="delete" onclick="del()"><span class="material-symbols-outlined">delete</span></button>          
         </div>`;

   alarms.insertAdjacentHTML("afterbegin", alarm);
   check();
   if(med_l==med){
      if(hour_l>hour){
         if(hour_l!=12){
            nhour=hour_l-hour;
            nmin=min_l-min;
            if(nmin<0){
              nmin+=60;
              nhour--;
            }
         }
         else{
            nhour=(hour_l-hour)+12;
            nmin=min_l-min;
            if(nmin<0){
              nmin+=60;
              nhour--;
            }
         }
      }
      else if(hour_l==hour){
         if(min_l>=min){
            nhour=hour_l-hour;
            nmin=min_l-min;
         }
         else{
            nhour=23;
            nmin=60-(min-min_l);
         }
      }
      else{
         if(hour!=12){
            nhour=24-(hour-hour_l);
            nmin=min_l-min;
            if(nmin<0){
              nmin+=60;
              nhour--;
            }
         }
         else{
            nhour=(hour_l-hour)+12;
            nmin=min_l-min;
            if(nmin<0){
              nmin+=60;
              nhour--;
            }
         }
      }
   }
   else{
         if(hour_l==12 && hour!=12){
              nhour=hour_l-hour;
              nmin=min_l-min;
              if(nmin<0){
                nmin+=60;
                nhour--;
              }
         }
         else if(hour==12&&hour_l!=12){
            nhour=hour_l+hour;
            nmin=min_l-min;
            if(nmin<0){
              nmin+=60;
              nhour--;
            }
         }
         else{
            nhour=(hour_l-hour)+12;
            nmin=min_l-min;
            if(nmin<0){
              nmin+=60;
              nhour--;
            }
         }
      }
   }
   if(nhour==0)
   {
      if(nmin==1)
   {
      alert(`Alarm will go off in less than ${nmin} minute.`);
   }
   else if(nmin==0)
   {
      alert(`Alarm will go off now.`);
   }
   else{
      alert(`Alarm will go off in ${nmin} minutes.`);
   }
   }
   else{
      alert(`Alarm wil go off in ${nhour} hours ${nmin} minutes.`);
   }
}
 document.getElementById("clear").addEventListener("click",()=>{alarms.remove();document.getElementById("clear").style="display:none;";alarmlist=[];})
   function del(){
      event.target.parentNode.parentNode.remove();
      alarmlist=alarmlist.filter(item=> item!=event.target.parentNode.parentNode.querySelector("h2").innerHTML)
      let list=document.querySelectorAll("#delete");
      if(list.length==0){
         document.getElementById("clear").style="display:none;"
      }
   }
   let x=1;
   setInterval(() => {
      let date= new Date();
   hour= date.getHours();
   if(hour>=12){
      if(hour!=12)
     {
      hour=hour-12;
   }
     med="pm"
   }
   else{
      if(hour==0){
         hour+=12;
      }
      med="am"
   }
   hour=hour<10?"0"+hour:hour
   min= date.getMinutes();
   min=min<10?"0"+min:min
   sec= date.getSeconds();
   sec=sec<10?"0"+sec:sec
   document.querySelector(".time").innerHTML=`${hour}:${min}:${sec} ${med}`;
   alarmlist.forEach((e)=>{
      if(e==`${hour}:${min} ${med}`){
         if(x==1){
         audio.play();
         audio.loop=true;
         document.querySelector(".buttons").style.display="flex"
         document.querySelector(".img").remove();
         document.querySelector(".flexbox").insertAdjacentHTML("afterbegin",img)
      }
      }
   })
   }, 1000);
  function stop(){
       audio.pause();
       x++;
       document.querySelector(".buttons").style.display="none";document.querySelector(".img").remove();
       document.querySelector(".flexbox").insertAdjacentHTML("afterbegin",`<img src="vec.png" alt="" class="img">`)
   setTimeout(() => {
      x--
   }, 60000);
  }
  function snooze(){
        audio.pause();
        x++;
        document.querySelector(".buttons").style.display="none";
        document.querySelector(".buttons").style.display="none";document.querySelector(".img").remove();
        document.querySelector(".flexbox").insertAdjacentHTML("afterbegin",`<img src="vec.png" alt="" class="img">`)
        setTimeout(() => {
         audio.play();
         audio.loop=true;
         x--;
         document.querySelector(".buttons").style.display="flex";
         document.querySelector(".img").remove();
         document.querySelector(".flexbox").insertAdjacentHTML("afterbegin",img)
        }, 600000)}
        let thour;
   setTimeout(() => {
      if(med=="pm"){
         if(hour!=12)
         {
         thour=hour+12;
      }
      else{
         thour=hour;
      }
      }
      else{
         if(hour==12){
            thour=0;
         }
         else{
            thour=hour;
         }
      }
      if(thour<12&&thour>4){
            document.getElementById("wish").innerHTML="Good Morning";
            document.body.style="background: url(morning.jpg);background-size: 100%;";
      }
      else if(thour>=12&&thour<17){
            document.getElementById("wish").innerHTML="Good Afternoon";
            document.body.style="background: url(afternoon.jpg);background-size: 100%;";
      }
      else if(thour>17&&thour<20){
         document.getElementById("wish").innerHTML="Good Evening";
         document.body.style="background: url(evening.jpg);background-size: 100%;";
   }
   else{
      document.getElementById("wish").innerHTML="Good Night";
      document.body.style="background: url(night.jpg);background-size: 100%;";
   }
   }, 1000);
