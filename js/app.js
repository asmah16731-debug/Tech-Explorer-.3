/* =====================================================
   กิจกรรมเรียงขั้นตอนการสืบค้นข้อมูล
===================================================== */

let draggedMissionCard = null;


/* เริ่มลาก */

document.addEventListener('dragstart', function(e){

    if(
        e.target.classList.contains(
            'mission-card-item'
        )
    ){

        draggedMissionCard = e.target;

        e.dataTransfer.effectAllowed = 'move';

    }

});


/* ช่องรับการลาก */

document.addEventListener('dragover', function(e){

    const slot =
        e.target.closest('.mission-slot');

    if(!slot){
        return;
    }

    e.preventDefault();

    slot.classList.add('drag-over');

});


/* เอาเมาส์ออกจากช่อง */

document.addEventListener('dragleave', function(e){

    const slot =
        e.target.closest('.mission-slot');

    if(!slot){
        return;
    }

    slot.classList.remove('drag-over');

});


/* วางการ์ด */

document.addEventListener('drop', function(e){

    const slot =
        e.target.closest('.mission-slot');

    if(!slot || !draggedMissionCard){
        return;
    }

    e.preventDefault();

    slot.classList.remove('drag-over');


    /* ถ้าช่องมีการ์ดอยู่แล้ว */

    const oldCard =
        slot.querySelector(
            '.mission-card-item'
        );


    if(oldCard){

        document
            .getElementById('missionCards')
            .appendChild(oldCard);

    }


    /* เอาการ์ดไปใส่ช่อง */

    slot.innerHTML = '';

    slot.appendChild(
        draggedMissionCard
    );


    draggedMissionCard = null;

});


/* =====================================================
   ตรวจภารกิจ
===================================================== */

function checkSearchMission(){

    const slots =
        document.querySelectorAll(
            '#missionSlots .mission-slot'
        );


    let correct = 0;

    let complete = true;


    slots.forEach(function(slot){

        const card =
            slot.querySelector(
                '.mission-card-item'
            );


        if(!card){

            complete = false;

            return;

        }


        const correctStep =
            slot.dataset.position;

        const cardStep =
            card.dataset.step;


        if(correctStep === cardStep){

            correct++;

        }

    });


    const result =
        document.getElementById(
            'searchMissionResult'
        );


    /* ยังเรียงไม่ครบ */

    if(!complete){

        result.className =
            'search-mission-result error';

        result.innerHTML = `
            <h3>🧩 ยังไม่ครบทุกขั้นตอน</h3>

            <p>
                กรุณาลากการ์ดทั้ง 4 ใบ
                มาเรียงในช่องให้ครบก่อนตรวจภารกิจ
            </p>
        `;

        return;

    }


    /* ถูกทั้งหมด */

    if(correct === 4){

        result.className =
            'search-mission-result success';

        result.innerHTML = `
            <h3>🎉 ภารกิจสำเร็จ!</h3>

            <p>
                เยี่ยมมาก!
                คุณเรียงขั้นตอนการสืบค้นข้อมูล
                ได้ถูกต้องครบทั้ง 4 ขั้นตอน
            </p>
        `;


        document
            .getElementById(
                'searchMissionNext'
            )
            .classList.add('show');


        /* บันทึกว่าผ่านบท */

        if(
            currentUser &&
            role === 'student'
        ){

            currentUser.chapter1Passed = true;

            saveUser();

            updateProgress();

        }


    }else{

        result.className =
            'search-mission-result error';

        result.innerHTML = `
            <h3>🔄 ลองจัดลำดับใหม่อีกครั้ง</h3>

            <p>
                ตอนนี้เรียงถูก ${correct} จาก 4 ขั้นตอน
                ลองทบทวนหัวข้อ
                “ขั้นตอนการสืบค้นข้อมูลแบบ Search Engine”
                แล้วจัดเรียงใหม่อีกครั้ง
            </p>
        `;

    }

}
const TEACHER_PASSWORD="1234";
const KEY="internetIT_classroom_v1";
let currentUser=null, role="student";

const questions=[
 {q:"ข้อใดเป็นตัวอย่างของคำค้นที่เฉพาะเจาะจงกว่า",a:["เทคโนโลยี","อินเทอร์เน็ต","วิธีตั้งรหัสผ่านที่ปลอดภัยสำหรับนักเรียน","ข้อมูล"],c:2},
 {q:"สิ่งใดควรตรวจสอบเมื่อประเมินความน่าเชื่อถือของเว็บไซต์",a:["สีของเว็บไซต์เท่านั้น","ผู้เขียน วันที่ และแหล่งอ้างอิง","จำนวนรูปภาพ","ขนาดตัวอักษร"],c:1},
 {q:"เมื่อพบข้อมูลสำคัญจากอินเทอร์เน็ต ควรทำอย่างไร",a:["แชร์ทันที","เชื่อทุกอย่าง","เปรียบเทียบกับแหล่งข้อมูลที่น่าเชื่อถือ","ลบข้อมูล"],c:2},
 {q:"ข้อใดเป็นมารยาทที่เหมาะสมบนอินเทอร์เน็ต",a:["ใช้คำหยาบ","เคารพความคิดเห็นและสิทธิของผู้อื่น","เผยแพร่ภาพคนอื่นทันที","ส่งข้อความรบกวนซ้ำ ๆ"],c:1},
 {q:"การนำผลงานของผู้อื่นมาใช้ควรคำนึงถึงเรื่องใด",a:["ลิขสิทธิ์และการอ้างอิงแหล่งที่มา","จำนวนผู้ติดตาม","ความเร็วอินเทอร์เน็ต","สีของไฟล์"],c:0},
 {q:"ข้อใดช่วยเพิ่มความปลอดภัยของบัญชี",a:["ใช้รหัสผ่านเดียวทุกเว็บไซต์","บอกรหัสผ่านเพื่อน","เปิดการยืนยันตัวตนหลายขั้นตอนเมื่อรองรับ","เขียนรหัสผ่านไว้สาธารณะ"],c:2},
 {q:"หากได้รับลิงก์ที่น่าสงสัยพร้อมข้อความเร่งด่วน ควรทำอย่างไร",a:["กดทันที","ส่งต่อให้เพื่อน","หยุดตรวจสอบผู้ส่งและช่องทางทางการก่อน","กรอกข้อมูลเพื่อทดลอง"],c:2},
 {q:"ข้อใดเป็นประโยชน์ของเทคโนโลยีสารสนเทศ",a:["เข้าถึงแหล่งเรียนรู้ได้รวดเร็ว","ทำให้เกิดข้อมูลผิดเสมอ","ทำให้ทุกคนติดหน้าจอ","ทำให้ไม่ต้องตรวจสอบข้อมูล"],c:0},
 {q:"ข้อใดเป็นความเสี่ยงจากการใช้เทคโนโลยี",a:["เรียนออนไลน์","ทำงานร่วมกัน","การละเมิดความเป็นส่วนตัว","สร้างสื่อการเรียนรู้"],c:2},
 {q:"แนวทางใดช่วยใช้เทคโนโลยีอย่างสมดุล",a:["ใช้งานโดยไม่พัก","แชร์ทุกอย่าง","กำหนดเวลาและตรวจสอบข้อมูลก่อนแชร์","เปิดเผยข้อมูลส่วนตัว"],c:2}
];
const postQuestions = [
    {
        q:"หากต้องการค้นข้อมูลเรื่อง “วิธีดูแลสุขภาพจากการใช้คอมพิวเตอร์” คำค้นใดเหมาะสมที่สุด?",
        a:[
            "วิธีดูแลสุขภาพ",
            "คอมพิวเตอร์",
            "วิธีดูแลสุขภาพจากการใช้คอมพิวเตอร์",
            "สุขภาพ"
        ],
        c:2
    },

    {
        q:"เมื่อนักเรียนพบข้อมูลจากเว็บไซต์หนึ่ง ควรทำอย่างไรก่อนนำข้อมูลไปใช้?",
        a:[
            "เชื่อข้อมูลทันที",
            "เปรียบเทียบกับแหล่งข้อมูลที่น่าเชื่อถือ",
            "ส่งต่อให้เพื่อน",
            "คัดลอกทั้งหมด"
        ],
        c:1
    },

    {
        q:"หากเพื่อนส่งข้อความมาพูดคุยบนอินเทอร์เน็ต เราควรปฏิบัติอย่างไร?",
        a:[
            "ใช้คำพูดสุภาพ",
            "ใช้คำหยาบ",
            "ล้อเลียนเพื่อน",
            "ส่งข้อความรบกวน"
        ],
        c:0
    },

    {
        q:"ก่อนนำรูปของเพื่อนไปเผยแพร่บนอินเทอร์เน็ต ควรทำสิ่งใด?",
        a:[
            "ขออนุญาตเพื่อนก่อน",
            "เผยแพร่ทันที",
            "ส่งให้คนอื่นก่อน",
            "แก้ไขรูปแล้วเผยแพร่"
        ],
        c:0
    },

    {
        q:"ข้อใดเป็นวิธีป้องกันข้อมูลส่วนตัวได้เหมาะสม?",
        a:[
            "บอกรหัสผ่านให้เพื่อน",
            "ใช้รหัสผ่านที่คาดเดาได้ง่าย",
            "ไม่เปิดเผยข้อมูลส่วนตัวโดยไม่จำเป็น",
            "เขียนข้อมูลส่วนตัวไว้ในที่สาธารณะ"
        ],
        c:2
    },

    {
        q:"นักเรียนใช้คอมพิวเตอร์ของโรงเรียนเสร็จแล้ว ควรทำอย่างไร?",
        a:[
            "เปิดบัญชีทิ้งไว้",
            "ออกจากระบบทุกครั้ง",
            "บอกรหัสผ่านให้เพื่อน",
            "เปิดเว็บไซต์ค้างไว้"
        ],
        c:1
    },

    {
        q:"หากพบไฟล์จากแหล่งที่ไม่รู้จัก นักเรียนควรทำอย่างไร?",
        a:[
            "ดาวน์โหลดทันที",
            "เปิดไฟล์ทันที",
            "หลีกเลี่ยงการดาวน์โหลดและขอคำแนะนำจากผู้ใหญ่",
            "ส่งไฟล์ต่อให้เพื่อน"
        ],
        c:2
    },

    {
        q:"ข้อใดเป็นประโยชน์ของเทคโนโลยีสารสนเทศ?",
        a:[
            "ทำให้ค้นหาข้อมูลเพื่อการเรียนรู้ได้สะดวก",
            "ทำให้ข้อมูลทุกอย่างถูกต้องเสมอ",
            "ทำให้ไม่ต้องพูดคุยกับผู้อื่น",
            "ทำให้ไม่ต้องตรวจสอบข้อมูล"
        ],
        c:0
    },

    {
        q:"นักเรียนได้รับข้อความว่า “คุณได้รับรางวัล กรุณาโอนเงินเพื่อรับรางวัล” ควรทำอย่างไร?",
        a:[
            "โอนเงินทันที",
            "ส่งข้อมูลส่วนตัวกลับไป",
            "ตรวจสอบและขอความช่วยเหลือจากผู้ใหญ่ที่ไว้ใจได้",
            "ส่งต่อข้อความให้เพื่อน"
        ],
        c:2
    },

    {
        q:"การใช้โทรศัพท์หรือคอมพิวเตอร์เป็นเวลานานโดยไม่พัก อาจเกิดผลอย่างไร?",
        a:[
            "ช่วยให้สุขภาพดีขึ้น",
            "อาจทำให้เกิดปัญหาด้านสุขภาพ",
            "ทำให้เรียนรู้ได้เร็วขึ้นเสมอ",
            "ไม่มีผลใด ๆ"
        ],
        c:1
    }
];

function db(){return JSON.parse(localStorage.getItem(KEY)||'{"students":{}}')}
function saveDB(x){localStorage.setItem(KEY,JSON.stringify(x))}
function modal(t,m){document.getElementById('modalTitle').textContent=t;document.getElementById('modalText').textContent=m;document.getElementById('modal').classList.add('show')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
function showResults(){

    if(!currentUser || role !== 'student'){
        modal(
            'กรุณาเข้าสู่ระบบ',
            'กรุณาเข้าสู่ระบบนักเรียนก่อนดูผลการเรียน'
        );
        return;
    }

    /* =========================
       ข้อมูลนักเรียน
    ========================= */

    document.getElementById('resultStudentName').textContent =
        'ผลการเรียนของ ' + currentUser.name;

    document.getElementById('resultName').textContent =
        currentUser.name || '-';

    document.getElementById('resultClass').textContent =
        currentUser.cls || '-';

    document.getElementById('resultNo').textContent =
        currentUser.no || '-';


    /* =========================
       คะแนนก่อนเรียน
    ========================= */

    const preScore =
        currentUser.pre
        ? currentUser.pre.score
        : null;


    /* =========================
       คะแนนหลังเรียน
    ========================= */

    const postScore =
        currentUser.post
        ? currentUser.post.score
        : null;


    document.getElementById('resultPreScore').textContent =
        preScore !== null
        ? preScore + '/10'
        : 'ยังไม่ได้ทำ';


    document.getElementById('resultPostScore').textContent =
        postScore !== null
        ? postScore + '/10'
        : 'ยังไม่ได้ทำ';


    /* =========================
       พัฒนาการ
    ========================= */

    if(preScore !== null && postScore !== null){

        const development =
            postScore - preScore;

        document.getElementById('resultDevelopment').textContent =
            (development > 0 ? '+' : '') +
            development +
            ' คะแนน';

    }else{

        document.getElementById('resultDevelopment').textContent =
            '-';

    }


    /* =========================
       ร้อยละ
    ========================= */

    if(postScore !== null){

        const percent =
            Math.round((postScore / 10) * 100);

        document.getElementById('resultPercent').textContent =
            percent + '%';

    }else{

        document.getElementById('resultPercent').textContent =
            '-';

    }


    /* =========================
       กิจกรรม
    ========================= */

    const activityCount =
        Object.keys(
            currentUser.activities || {}
        ).length;

    const activityPercent =
        Math.round((activityCount / 4) * 100);


    document.getElementById('resultActivities').textContent =
        'ทำแล้ว ' +
        activityCount +
        '/4 บท';


    document.getElementById('resultActivityBar').style.width =
        activityPercent + '%';


    /* =========================
       สถานะการเรียน
    ========================= */

    let status = '';

    if(!currentUser.pre){

        status =
            '📝 ยังไม่ได้ทำแบบทดสอบก่อนเรียน';

    }else if(activityCount < 4){

        status =
            '📚 กำลังเรียนอยู่ — ทำกิจกรรมครบ ' +
            activityCount +
            '/4 บท';

    }else if(!currentUser.post){

        status =
            '🏆 เรียนครบ 4 บทแล้ว — รอทำแบบทดสอบหลังเรียน';

    }else{

        status =
            '🎉 เรียนและทำแบบทดสอบครบแล้ว';

    }


    document.getElementById('resultStatus').textContent =
        status;


    /* =========================
       วันที่
    ========================= */

    if(currentUser.post){

        document.getElementById('resultDate').textContent =
            'ทำแบบทดสอบหลังเรียนเมื่อ ' +
            currentUser.post.time;

    }else if(currentUser.pre){

        document.getElementById('resultDate').textContent =
            'ทำแบบทดสอบก่อนเรียนเมื่อ ' +
            currentUser.pre.time;

    }else{

        document.getElementById('resultDate').textContent =
            'ยังไม่มีข้อมูลการทำแบบทดสอบ';

    }

}
function go(id){

    document.querySelectorAll('.page')
        .forEach(x => x.classList.remove('active'));

    const el = document.getElementById(id);

    if(el){
        el.classList.add('active');
    }

    document.querySelectorAll('nav button')
        .forEach(x =>
            x.classList.toggle(
                'active',
                x.dataset.page === id
            )
        );

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    if(id === 'teacher'){
        refreshTeacher();
    }

    if(id === 'home'){
        updateProgress();
    }

    if(id === 'results'){
        showResults();
    }
}
function openActivity(chapter, activityId){

    // เปิดหน้าบทที่ต้องการ
    go(chapter);

    // รอให้หน้าแสดงก่อน แล้วเลื่อนไปยังกิจกรรม
    setTimeout(function(){

        const activity = document.getElementById(activityId);

        if(activity){

            activity.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    }, 200);

}
document.querySelectorAll('nav button').forEach(b=>{

    b.onclick = () => {

        /* =========================
           ตรวจสอบการเข้าสู่ระบบ
        ========================= */

        if(!currentUser){

            go('login');

            modal(
                'ต้องเข้าสู่ระบบ',
                'กรุณาเข้าสู่ระบบนักเรียนหรือครูก่อน'
            );

            return;
        }


        /* =========================
           หน้าครูผู้สอน
        ========================= */

        if(b.dataset.page === 'teacher' && role !== 'teacher'){

            modal(
                'สำหรับครูผู้สอนเท่านั้น',
                'กรุณาออกจากระบบนักเรียน แล้วเข้าสู่ระบบครูผู้สอนเพื่อเข้าหน้านี้'
            );

            return;
        }


        /* =========================
           เปิดหน้าที่เลือก
        ========================= */

        go(b.dataset.page);

    };

});
document.getElementById('studentRole').onclick=()=>{role='student';document.getElementById('studentForm').classList.remove('hidden');document.getElementById('teacherForm').classList.add('hidden')};
document.getElementById('teacherRole').onclick=()=>{role='teacher';document.getElementById('teacherForm').classList.remove('hidden');document.getElementById('studentForm').classList.add('hidden')};

function studentLogin(){
 const name=document.getElementById('studentName').value.trim(), cls=document.getElementById('studentClass').value.trim(), no=document.getElementById('studentNo').value.trim();
 if(!name||!cls||!no){modal('ข้อมูลไม่ครบ','กรุณากรอกชื่อ ชั้น และเลขที่ให้ครบ');return}
 const id=name+'|'+cls+'|'+no, d=db();
 if(!d.students[id]) d.students[id]={id,name,cls,no,loginCount:0,pre:null,post:null,activities:{},history:[]};
 d.students[id].loginCount++;d.students[id].lastLogin=new Date().toLocaleString('th-TH');d.students[id].history.push({time:new Date().toISOString(),type:'login'});
 saveDB(d);currentUser=d.students[id];role='student';
 document.getElementById('userPill').textContent='👨‍🎓 '+name+' | '+cls+' เลขที่ '+no;
 modal('เข้าสู่ห้องเรียนสำเร็จ','ยินดีต้อนรับ '+name+' พร้อมเริ่มการเรียนรู้ได้เลย');
 go('home');updateProgress();restoreActivities();
}
function teacherLogin(){
 if(document.getElementById('teacherPass').value!==TEACHER_PASSWORD){
    modal('รหัสผ่านไม่ถูกต้อง','กรุณาตรวจสอบรหัสผ่านครูผู้สอน');
    return;
 }

 role='teacher';
 currentUser={name:'ครูผู้สอน'};
 document.getElementById('userPill').textContent='👩‍🏫 ครูผู้สอน';
 go('teacher');
 refreshTeacher();
}


/* =========================
   ออกจากระบบ
   ========================= */

function logout(){

    currentUser = null;

    role = 'student';

    const userPill = document.getElementById('userPill');

    if(userPill){
        userPill.textContent = 'ยังไม่ได้เข้าสู่ระบบ';
    }

    go('login');

    modal(
        'ออกจากระบบแล้ว',
        'คุณออกจากระบบเรียบร้อยแล้ว'
    );
}


function updateProgress(){
 if(!currentUser||role!=='student')return;

 let n=0;
 if(currentUser.pre)n++;
 if(currentUser.activities&&Object.keys(currentUser.activities).length===4)n+=4;
 if(currentUser.post)n++;

 const pct=Math.round(n/6*100);

 document.getElementById('progressBar').style.width=
     Math.min(pct,100)+'%';

 document.getElementById('progressText').textContent=
     'ความก้าวหน้า '+Math.min(pct,100)+'%'+
     (currentUser.post?
     ' — เรียนครบและทำแบบทดสอบหลังเรียนแล้ว 🎉':'');
}function saveUser(){
 const d=db();if(currentUser&&role==='student'){d.students[currentUser.id]=currentUser;saveDB(d)}
}
function saveActivity(id){
 if(!currentUser||role!=='student'){modal('กรุณาเข้าสู่ระบบ','เข้าสู่ระบบนักเรียนก่อนบันทึกกิจกรรม');return}
 const value=document.getElementById(id).value.trim();if(!value){modal('ยังไม่มีคำตอบ','กรุณาพิมพ์คำตอบก่อนบันทึก');return}
 currentUser.activities=currentUser.activities||{};currentUser.activities[id]={answer:value,time:new Date().toLocaleString('th-TH')};saveUser();
 document.getElementById(id+'status').textContent=' ✓ บันทึกแล้ว';updateProgress();
}
function restoreActivities(){['act1','act2','act3','act4'].forEach(id=>{const x=currentUser?.activities?.[id];if(x)document.getElementById(id).value=x.answer})}

function renderQuiz(type){
    const box = document.getElementById(type + 'Quiz');
    box.innerHTML = '';

    const quizQuestions = type === 'post' ? postQuestions : questions;

    quizQuestions.forEach((q, i) => {

        let s = '<div class="quiz-q">';

        s += '<strong>' + (i + 1) + '. ' + q.q + '</strong>';

        q.a.forEach((a, j) => {

            s += `
                <label class="option"
                       onclick="checkAnswer('${type}', ${i}, ${j}, this)">
                    <input type="radio"
                           name="${type}q${i}"
                           value="${j}">
                    ${a}
                </label>
            `;

        });

        s += '</div>';

        box.innerHTML += s;
    });
}
function checkAnswer(type, questionIndex, selectedIndex, selectedElement){
const q =
    type === 'post'
    ? postQuestions[questionIndex]
    : questions[questionIndex];
    const questionBox = selectedElement.closest('.quiz-q');

    const options = questionBox.querySelectorAll('.option');

    /* ถ้าข้อนี้ตอบไปแล้ว ไม่ให้เลือกซ้ำ */
    if(questionBox.classList.contains('answered')){
        return;
    }

    /* ทำเครื่องหมายว่าตอบแล้ว */
    questionBox.classList.add('answered');

    /* radio ของคำตอบที่เลือก */
    const selectedRadio = selectedElement.querySelector('input');

    /* ตรวจคำตอบ */
    if(selectedIndex === q.c){

        /* =========================
           ตอบถูก
        ========================= */

        selectedElement.classList.add('correct');

        selectedElement.insertAdjacentHTML(
            'beforeend',
            ' <span>✅ ถูกต้อง</span>'
        );

    }else{

        /* =========================
           ตอบผิด
        ========================= */

        selectedElement.classList.add('wrong');

        selectedElement.insertAdjacentHTML(
            'beforeend',
            ' <span>❌ ผิด</span>'
        );

        /* แสดงคำตอบที่ถูกเป็นสีเขียว */
        const correctOption = options[q.c];

        correctOption.classList.add('correct');

        correctOption.insertAdjacentHTML(
            'beforeend',
            ' <span>✅ คำตอบที่ถูก</span>'
        );
    }

    /* =========================
       ล็อกตัวเลือกอื่น
       แต่ไม่ล็อก radio ที่เลือก
       เพื่อให้ :checked ยังทำงาน
    ========================= */

    options.forEach(option => {

        option.classList.add('disabled');

        const radio = option.querySelector('input');

        if(radio && radio !== selectedRadio){

            radio.disabled = true;

        }

    });

}
function submitQuiz(type){
 if(!currentUser||role!=='student'){modal('กรุณาเข้าสู่ระบบ','แบบทดสอบสำหรับนักเรียนเท่านั้น');return}
let score=0, unanswered=0;

const quizQuestions = type === 'post' ? postQuestions : questions;

quizQuestions.forEach((q,i)=>{const el=document.querySelector('input[name="'+type+'q'+i+'"]:checked');if(!el)unanswered++;else if(+el.value===q.c)score++});
 if(unanswered){modal('ยังตอบไม่ครบ','กรุณาตอบให้ครบทั้ง 10 ข้อก่อนส่งแบบทดสอบ');return}
 const result={score,total:10,time:new Date().toLocaleString('th-TH')};currentUser[type]=result;currentUser.history.push({time:new Date().toISOString(),type,score});saveUser();
 const target=document.getElementById(type+'Result');target.innerHTML='<div class="result"><b>คะแนน '+score+'/10</b> — '+(score>=8?'ยอดเยี่ยม 🎉':score>=5?'ทำได้ดี 👍':'ทบทวนบทเรียนเพิ่มเติม 📚')+'<br><small>บันทึกเมื่อ '+result.time+'</small></div>';
 updateProgress();
}
function refreshTeacher(){
 const d=db(), arr=Object.values(d.students);document.getElementById('studentCount').textContent=arr.length;document.getElementById('preCount').textContent=arr.filter(x=>x.pre).length;document.getElementById('postCount').textContent=arr.filter(x=>x.post).length;
 const tbody=document.getElementById('teacherTable');tbody.innerHTML='';
 arr.sort((a,b)=>(a.name||'').localeCompare(b.name||'','th')).forEach(x=>{
  const act=Object.keys(x.activities||{}).length;
  const pc=x.pre?x.pre.score+'/10':'—', po=x.post?x.post.score+'/10':'—';
  const tr=document.createElement('tr');tr.innerHTML='<td>'+esc(x.name)+'</td><td>'+esc(x.cls)+'</td><td>'+esc(x.no)+'</td><td>'+esc(x.lastLogin||'—')+'</td><td>'+pc+'</td><td>'+po+'</td><td>'+act+'/4</td>';tbody.appendChild(tr)
 })
}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function exportCSV(){
 const d=db(),arr=Object.values(d.students);if(!arr.length){modal('ไม่มีข้อมูล','ยังไม่มีข้อมูลนักเรียน');return}
 let csv='ชื่อ-นามสกุล,ชั้น,เลขที่,เข้าใช้ล่าสุด,ก่อนเรียน,หลังเรียน,กิจกรรม\n';
 arr.forEach(x=>csv+=[x.name,x.cls,x.no,x.lastLogin||'',x.pre?.score??'',x.post?.score??'',Object.keys(x.activities||{}).length+'/4'].map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')+'\\n');
 const blob=new Blob(["\uFEFF"+csv],{type:'text/csv;charset=utf-8;'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='คะแนนนักเรียน_อินเทอร์เน็ตและเทคโนโลยีสารสนเทศ.csv';a.click();URL.revokeObjectURL(a.href)
}
function clearAllData(){
 if(confirm('ยืนยันล้างข้อมูลนักเรียนและคะแนนทั้งหมดในเบราว์เซอร์นี้?')){localStorage.removeItem(KEY);refreshTeacher();modal('ล้างข้อมูลแล้ว','ข้อมูลทั้งหมดถูกลบจากเบราว์เซอร์นี้แล้ว')}
}
renderQuiz('pre');renderQuiz('post');
updateProgress();
/* =====================================================
   กิจกรรมบทที่ 2
   จัดหมวดหมู่ข้อตกลงในการใช้อินเทอร์เน็ต
===================================================== */

let draggedRuleCard = null;


/* =====================================================
   เริ่มลากการ์ด
===================================================== */

document.addEventListener('dragstart', function(e){

    if(
        e.target.classList.contains(
            'rule-card-item'
        )
    ){

        draggedRuleCard = e.target;

        e.target.classList.add('dragging');

    }

});


/* =====================================================
   จบการลาก
===================================================== */

document.addEventListener('dragend', function(e){

    if(
        e.target.classList.contains(
            'rule-card-item'
        )
    ){

        e.target.classList.remove('dragging');

        draggedRuleCard = null;

    }

});


/* =====================================================
   ลากผ่านหมวดหมู่
===================================================== */

document.addEventListener('dragover', function(e){

    const category =
        e.target.closest('.rule-category');

    if(!category) return;

    e.preventDefault();

    category.classList.add('drag-over');

});


/* =====================================================
   ออกจากหมวดหมู่
===================================================== */

document.addEventListener('dragleave', function(e){

    const category =
        e.target.closest('.rule-category');

    if(!category) return;

    category.classList.remove('drag-over');

});


/* =====================================================
   วางการ์ด
===================================================== */

document.addEventListener('drop', function(e){

    const category =
        e.target.closest('.rule-category');

    if(!category) return;

    e.preventDefault();

    category.classList.remove('drag-over');


    if(!draggedRuleCard) return;


    const dropArea =
        category.querySelector(
            '.category-drop-area'
        );


    /* ย้ายการ์ดไปยังหมวดหมู่ */

    dropArea.appendChild(
        draggedRuleCard
    );

});


/* =====================================================
   ตรวจคำตอบ
===================================================== */

function checkInternetRuleMission(){

    const categories =
        document.querySelectorAll(
            '.rule-category'
        );


    let totalCards = 0;

    let correctCards = 0;


    categories.forEach(category => {

        const correctCategory =
            category.dataset.category;


        const cards =
            category.querySelectorAll(
                '.rule-card-item'
            );


        cards.forEach(card => {

            totalCards++;


            if(
                card.dataset.category ===
                correctCategory
            ){

                correctCards++;

            }

        });

    });


    const result =
        document.getElementById(
            'internetRuleResult'
        );


    const next =
        document.getElementById(
            'internetRuleNext'
        );


    /* =================================================
       ยังวางไม่ครบ
    ================================================== */

    if(totalCards < 6){

        result.className =
            'rule-mission-result error';

        result.innerHTML =
            '⚠️ ยังวางการ์ดไม่ครบ<br>' +
            'กรุณาลากการ์ดทั้ง 6 ใบไปยังหมวดหมู่ก่อน';

        next.style.display = 'none';

        return;

    }


    /* =================================================
       ถูกทั้งหมด
    ================================================== */

    if(correctCards === 6){

        result.className =
            'rule-mission-result success';

        result.innerHTML =
            '🎉 เก่งมาก! ทำภารกิจสำเร็จแล้ว<br>' +
            'คุณจัดหมวดหมู่ข้อตกลงในการใช้อินเทอร์เน็ตได้ถูกต้องทั้งหมด';


        next.style.display =
            'block';


        /* บันทึกการผ่านบทที่ 2 */

        if(
            currentUser &&
            role === 'student'
        ){

            currentUser.activities =
                currentUser.activities || {};


            currentUser.activities.act2 = {

                answer:
                    'ผ่านกิจกรรมบทที่ 2',

                time:
                    new Date()
                        .toLocaleString(
                            'th-TH'
                        )

            };


            currentUser.chapter2Passed =
                true;


            saveUser();

            updateProgress();

        }

    }

    /* =================================================
       ตอบผิด
    ================================================== */

    else{

        result.className =
            'rule-mission-result error';

        result.innerHTML =
            '❌ ยังไม่ถูกต้องทั้งหมด<br>' +
            'ลองทบทวนบทเรียน แล้วจัดการ์ดใหม่อีกครั้ง';

        next.style.display =
            'none';

    }

}
/* =====================================================
   กิจกรรมบทที่ 3
   จับคู่สถานการณ์กับวิธีใช้เทคโนโลยีอย่างปลอดภัย
===================================================== */

let draggedSafeTechCard = null;


/* =====================================================
   เริ่มลาก
===================================================== */

document.addEventListener('dragstart', function(e){

    if(
        e.target.classList.contains(
            'safe-tech-card'
        )
    ){

        draggedSafeTechCard = e.target;

        e.target.classList.add('dragging');

    }

});


/* =====================================================
   จบการลาก
===================================================== */

document.addEventListener('dragend', function(e){

    if(
        e.target.classList.contains(
            'safe-tech-card'
        )
    ){

        e.target.classList.remove('dragging');

        draggedSafeTechCard = null;

    }

});


/* =====================================================
   ลากผ่านหมวดหมู่
===================================================== */

document.addEventListener('dragover', function(e){

    const category =
        e.target.closest(
            '.safe-tech-category'
        );

    if(!category) return;

    e.preventDefault();

    category.classList.add('drag-over');

});


/* =====================================================
   ลากออกจากหมวดหมู่
===================================================== */

document.addEventListener('dragleave', function(e){

    const category =
        e.target.closest(
            '.safe-tech-category'
        );

    if(!category) return;

    category.classList.remove('drag-over');

});


/* =====================================================
   วางการ์ด
===================================================== */

document.addEventListener('drop', function(e){

    const category =
        e.target.closest(
            '.safe-tech-category'
        );

    if(!category) return;

    e.preventDefault();

    category.classList.remove('drag-over');


    if(!draggedSafeTechCard) return;


    const dropArea =
        category.querySelector(
            '.safe-drop-area'
        );


    dropArea.appendChild(
        draggedSafeTechCard
    );

});


/* =====================================================
   ตรวจภารกิจ
===================================================== */

function checkSafeTechMission(){

    const categories =
        document.querySelectorAll(
            '.safe-tech-category'
        );


    let totalCards = 0;

    let correctCards = 0;


    categories.forEach(category => {

        const correctCategory =
            category.dataset.category;


        const cards =
            category.querySelectorAll(
                '.safe-tech-card'
            );


        cards.forEach(card => {

            totalCards++;


            if(
                card.dataset.category ===
                correctCategory
            ){

                correctCards++;

            }

        });

    });


    const result =
        document.getElementById(
            'safeTechResult'
        );


    const next =
        document.getElementById(
            'safeTechNext'
        );


    /* =================================================
       ยังวางไม่ครบ
    ================================================== */

    if(totalCards < 5){

        result.className =
            'safe-tech-result error';

        result.innerHTML =
            '⚠️ ยังวางการ์ดไม่ครบ<br>' +
            'กรุณาลากการ์ดทั้ง 5 ใบไปยังหมวดหมู่ก่อน';

        next.style.display =
            'none';

        return;

    }


    /* =================================================
       ถูกทั้งหมด
    ================================================== */

    if(correctCards === 5){

        result.className =
            'safe-tech-result success';

        result.innerHTML =
            '🎉 เก่งมาก! ทำภารกิจสำเร็จแล้ว<br>' +
            'คุณจับคู่สถานการณ์กับวิธีใช้เทคโนโลยีอย่างปลอดภัยได้ถูกต้องทั้งหมด';


        next.style.display =
            'block';


        /* บันทึกการผ่านบทที่ 3 */

        if(
            currentUser &&
            role === 'student'
        ){

            currentUser.activities =
                currentUser.activities || {};


            currentUser.activities.act3 = {

                answer:
                    'ผ่านกิจกรรมบทที่ 3',

                time:
                    new Date()
                        .toLocaleString(
                            'th-TH'
                        )

            };


            currentUser.chapter3Passed =
                true;


            saveUser();

            updateProgress();

        }

    }


    /* =================================================
       ตอบผิด
    ================================================== */

    else{

        result.className =
            'safe-tech-result error';

        result.innerHTML =
            '❌ ยังไม่ถูกต้องทั้งหมด<br>' +
            'ลองทบทวนวิธีใช้เทคโนโลยีอย่างปลอดภัย แล้วจัดการ์ดใหม่อีกครั้ง';

        next.style.display =
            'none';

    }

}
/* =====================================================
   กิจกรรมบทที่ 4 : ภารกิจนักสำรวจเทคโนโลยี
===================================================== */

let draggedTechEffectCard = null;

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".effect-card");
    const dropBoxes = document.querySelectorAll(".effect-drop-box");

    cards.forEach(card => {

        card.addEventListener("dragstart", function () {
            draggedTechEffectCard = this;
            this.classList.add("dragging");
        });

        card.addEventListener("dragend", function () {
            this.classList.remove("dragging");
            draggedTechEffectCard = null;
        });

    });


    dropBoxes.forEach(box => {

        box.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        box.addEventListener("drop", function (e) {

            e.preventDefault();

            if (!draggedTechEffectCard) return;

            const emptyText = this.querySelector(":scope > span");

            if (emptyText) {
                emptyText.remove();
            }

            this.appendChild(draggedTechEffectCard);
        });

    });

});


function checkTechEffectMission() {

    const dropBoxes =
        document.querySelectorAll(".effect-drop-box");

    let total = 0;
    let correct = 0;

    dropBoxes.forEach(box => {

        const category =
            box.dataset.category;

        const cards =
            box.querySelectorAll(".effect-card");

        cards.forEach(card => {

            total++;

            if (card.dataset.effect === category) {
                correct++;
            }

        });

    });


    const result =
        document.getElementById("techEffectResult");

    const next =
        document.getElementById("techEffectNext");


    if (total < 8) {

        result.innerHTML =
            "📌 กรุณาลากสถานการณ์ให้ครบทั้ง 8 ข้อก่อนตรวจสอบ";

        result.style.color = "#e67e22";

        return;
    }


    if (correct === 8) {

        result.innerHTML =
            "🎉 เก่งมาก! จัดหมวดหมู่ข้อดีและข้อเสียได้ถูกต้องทั้งหมด";

        result.style.color = "#16a34a";

        if (typeof currentUser !== "undefined" && currentUser) {

            currentUser.activities =
                currentUser.activities || {};

            currentUser.activities.act4 = {
                answer: "ผ่านกิจกรรมบทที่ 4",
                time: new Date().toISOString()
            };

            currentUser.chapter4Passed = true;

            if (typeof saveUser === "function") {
                saveUser();
            }

            if (typeof updateProgress === "function") {
                updateProgress();
            }
        }

        next.style.display = "block";

    } else {

        result.innerHTML =
            "❌ ยังมีบางสถานการณ์ที่จัดหมวดหมู่ไม่ถูกต้อง ลองตรวจสอบอีกครั้งนะ";

        result.style.color = "#dc2626";

        next.style.display = "none";
    }
}
