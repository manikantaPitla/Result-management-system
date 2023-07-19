let studentName = document.getElementById("studentName");
let fatherName = document.getElementById("fatherName");
let motherName = document.getElementById("motherName");
let dateOfBirth = document.getElementById("dateOfBirth");
let courseSelectField = document.getElementById("courseSelectField");
let monthYearOfPass = document.getElementById("monthYearOfPass");
let languageMedium = document.getElementById("languageMedium");


let HallticketNumber = document.getElementById("HallticketNumber");

//yr one marks
let yearOneEnglish = document.getElementById("yearOneEnglish");
let yearOneSecondLang = document.getElementById("yearOneSecondLang");
let yearOneSLMarks = document.getElementById("yearOneSLMarks");
let yearOneMathsA = document.getElementById("yearOneMathsA");
let yearOneMathsB = document.getElementById("yearOneMathsB");
let yearonePhysics = document.getElementById("yearonePhysics");
let yearoneChemistry = document.getElementById("yearoneChemistry");

// year two marks
let yearTwoEnglish = document.getElementById("yearTwoEnglish");
let yearTwoSecondLang = document.getElementById("yearTwoSecondLang");
let yearTwoSLMarks = document.getElementById("yearTwoSLMarks");
let yearTwoMathsA = document.getElementById("yearTwoMathsA");
let yearTwoMathsB = document.getElementById("yearTwoMathsB");
let yearTwoPhysics = document.getElementById("yearTwoPhysics");
let yearTwoChemistry = document.getElementById("yearTwoChemistry");
let yearTwoPhyPractical = document.getElementById("yearTwoPhyPractical");
let yearTwoChemPractical = document.getElementById("yearTwoChemPractical");


let postResSubmitBtn = document.getElementById("postResSubmitBtn");
let resetFormBtn = document.getElementById("resetFormBtn");

// Err msg elemements
let stuNameErrMsg = document.getElementById("stuNameErrMsg");
let fatherNameErrMsg = document.getElementById("fatherNameErrMsg");
let motherNameErrMsg = document.getElementById("motherNameErrMsg");
let dobErrMsg = document.getElementById("dobErrMsg");
let monthYearPassErrMsg = document.getElementById("monthYearPassErrMsg");
let htErrMsg = document.getElementById("htErrMsg");

let oneEngErrMsg = document.getElementById("oneEngErrMsg");
let oneSlErrMsg = document.getElementById("oneSlErrMsg");
let oneMaErrMsg = document.getElementById("oneMaErrMsg");
let oneMbErrMsg = document.getElementById("oneMbErrMsg");
let onePhyErrMsg = document.getElementById("onePhyErrMsg");  
let oneChemErrMsg = document.getElementById("oneChemErrMsg");  

let twoEngErrMsg = document.getElementById("twoEngErrMsg");  
let twoSlErrMsg = document.getElementById("twoSlErrMsg");  
let twoMaErrMsg = document.getElementById("twoMaErrMsg");  
let twoMbErrMsg = document.getElementById("twoMbErrMsg");  
let twoPhyErrMsg = document.getElementById("twoPhyErrMsg");  
let twoChemErrMsg = document.getElementById("twoChemErrMsg");  
let twoPhyPractErrMsg = document.getElementById("twoPhyPractErrMsg");  
let twoChemPractErrMsg = document.getElementById("twoChemPractErrMsg");  

let marksErrMsg = document.getElementById("marksErrMsg");  

// checking if user logged in 
window.addEventListener("load", () => {
    let loginUser = localStorage.getItem("loginUser");
    if (!loginUser) {
        alert("Please login to continue!")
        window.location.href = 'index.html';
    }
});


document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loginUser");
    window.location.href = "index.html";
});

let studentId = 1010;
function updateData(studentInfo, parsedYearOneMarks, parsedYearTwoMarks){

    let totalMarks = 0;

    for(let i = 0; i < parsedYearOneMarks.length; i++){
        totalMarks += parsedYearOneMarks[i];
    }

    for(let j = 0; j < parsedYearTwoMarks.length; j++){
        totalMarks += parsedYearTwoMarks[j];
    }


    function calculateGrade(marks) {
        var percentage = (marks / 1000) * 100;
      
        switch (true) {
          case percentage >= 75:
            return 'A';
          case percentage >= 60:
            return 'B';
          case percentage >= 50:
            return 'C';
          case percentage >= 35:
            return 'D';
          default:
            return 'F';
        }
    }
      
    let stuGrade = calculateGrade(totalMarks);
      

    studentId += 1;

    let studentData ={
        id:studentId,
        hallticket: parseInt(studentInfo[7]),
        name: studentInfo[0],
        student_details: {
          father_name: studentInfo[1],
          mother_name: studentInfo[2],
          date_of_birth: studentInfo[3],
          course: studentInfo[4],
          month_and_year_of_pass: studentInfo[5],
          medium: studentInfo[6]
        },
        obtained_marks: {
          year_one: {
            english_1: parsedYearOneMarks[0],
            second_lang_1: parsedYearOneMarks[1],
            maths_a_1: parsedYearOneMarks[2],
            maths_b_1: parsedYearOneMarks[3],
            physics_1: parsedYearOneMarks[4],
            chemistry_1: parsedYearOneMarks[5]
          },
          year_two: {
            english_2: parsedYearTwoMarks[0],
            second_lang_2: parsedYearTwoMarks[1],
            maths_a_2: parsedYearTwoMarks[2],
            maths_b_2: parsedYearTwoMarks[3],
            physics_2: parsedYearTwoMarks[4],
            chemistry_2: parsedYearTwoMarks[5],
            physics_practical_2: parsedYearTwoMarks[6],
            chemistry_practical_2: parsedYearTwoMarks[7]
            }
        },
        result: {
          marks : totalMarks,
          grade: stuGrade
        }

    }
    

    async function postData() {
        try {
          let postMethod = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(studentData),
          };
      
          let hostUrl = "https://kind-plum-woolens.cyclic.app/studentData";
      
          const response = await fetch(hostUrl, postMethod);
          console.log(response.ok);
          const jsonData = await response.json();
      
          let responseMsg = jsonData.message;
          if (responseMsg === "Data added successfully!") {
            marksErrMsg.textContent = "Data Submitted Successfully!";
            marksErrMsg.classList.add("text-success");
          } else if (responseMsg === "Hallticket value must be unique") {
            if (marksErrMsg.classList.contains("text-success")) {
              marksErrMsg.classList.remove("text-success");
            }
            marksErrMsg.textContent = `The student with ${studentInfo[7]} hallticket number already exists in our database.`;
          } else {
            marksErrMsg.textContent = jsonData.message;
          }
        } catch (error) {
          alert("An error occurred while fetching the data: " + error.message);
          console.error(error);
        }
      }
      
      postData();
      
  
}

let errMsgEl = []


function getInputValues(){
    marksErrMsg.textContent = "";

    errMsgEl = [stuNameErrMsg, fatherNameErrMsg, motherNameErrMsg, dobErrMsg, null, monthYearPassErrMsg, null, htErrMsg, oneEngErrMsg, null,
    oneSlErrMsg, oneMaErrMsg,
    oneMbErrMsg, onePhyErrMsg, oneChemErrMsg, twoEngErrMsg, null, twoSlErrMsg, twoMaErrMsg, twoMbErrMsg, twoPhyErrMsg, twoChemErrMsg,
    twoPhyPractErrMsg, twoChemPractErrMsg ]
    
    let inputFields = [studentName.value, fatherName.value, motherName.value, dateOfBirth.value, courseSelectField.value, monthYearOfPass.value,
    languageMedium.value, HallticketNumber.value, yearOneEnglish.value, yearOneSecondLang.value, yearOneSLMarks.value, 
    yearOneMathsA.value, yearOneMathsB.value, yearonePhysics.value, yearoneChemistry.value, yearTwoEnglish.value, yearTwoSecondLang.value, 
    yearTwoSLMarks.value, yearTwoMathsA.value, yearTwoMathsB.value,  yearTwoPhysics.value, yearTwoChemistry.value, yearTwoPhyPractical.value,
    yearTwoChemPractical.value];

    let fieldEmpty = true;

    for(let i = 0; i < inputFields.length; i++){
        if(errMsgEl[i] !== null){
            errMsgEl[i].textContent = "";
        }

        if(inputFields[i] === ""){
            fieldEmpty = false;
            errMsgEl[i].textContent = "Required*";  
        }
    }


    let studentInfo = [studentName.value, fatherName.value, motherName.value, dateOfBirth.value, courseSelectField.value, monthYearOfPass.value,
        languageMedium.value, HallticketNumber.value]
    
    let yearOneMarks = [yearOneEnglish.value, yearOneSLMarks.value, 
    yearOneMathsA.value, yearOneMathsB.value, yearonePhysics.value, yearoneChemistry.value]

    let yearTwoMarks = [yearTwoEnglish.value, 
    yearTwoSLMarks.value, yearTwoMathsA.value, yearTwoMathsB.value,  yearTwoPhysics.value, yearTwoChemistry.value, yearTwoPhyPractical.value,
    yearTwoChemPractical.value]

    let parsedYearOneMarks = [];

    for(let eachMarks of yearOneMarks){
        parsedYearOneMarks.push(parseInt(eachMarks));
    }
    

    let parsedYearTwoMarks = [];

    for(let eachMarks of yearTwoMarks){
        parsedYearTwoMarks.push(parseInt(eachMarks));
    }

    let Y1 = parsedYearOneMarks;
    let Y2 = parsedYearTwoMarks;

    let c1 = (Y1[0] <= 100 && Y1[1] <= 100) && (Y2[0] <= 100 && Y2[1] <= 100)
    let c2 = (Y1[2] <= 75 && Y1[3] <= 75) && (Y2[2] <= 75 && Y2[3] <= 75)
    let c3 = (Y1[4] <= 60 && Y1[5] <= 60) && (Y2[4] <= 60 && Y2[5] <= 60)
    let c4 =  (Y2[6] <= 30 && Y2[7] <= 30)

    if(fieldEmpty){
        if(c1 && c2 && c3 && c4){
                   
            if(HallticketNumber.value.length === 10){
                updateData(studentInfo, parsedYearOneMarks, parsedYearTwoMarks);
            }else{
                marksErrMsg.textContent = "Hallticket number must be 10 Digits.";
            }

        }else{
            if(marksErrMsg.classList.contains("text-success")){
                marksErrMsg.classList.remove("text-success");
            }

            if(!c1){
                marksErrMsg.textContent = `English and ${inputFields[9]} marks cannot be greater than 100`;
            }else if(!c2){
                marksErrMsg.textContent = `Maths marks cannot be greater than 75`;
            }else if(!c3){
                marksErrMsg.textContent = `Physics and Chemistry marks cannot be greater than 60`;
            }else if(!c4){
                marksErrMsg.textContent = `Physics practical and Chemistry practical marks cannot be greater than 30`;
            }
        }
    }else{
        marksErrMsg.textContent = "All fields are required!";
        marksErrMsg.classList.remove("text-success");
    }
}

postResSubmitBtn.addEventListener("click",function(event){
	event.preventDefault();
    getInputValues();
    
})


resetFormBtn.addEventListener("click", ()=>{
    for(let i of errMsgEl){
        if(i !== null){
            i.textContent = "";
        }
    }
    marksErrMsg.textContent = ""; 
})


function delStudentData(delReqErrMsg, stuDelHT){
    async function deleteData() {
        try {
          let dbUrl = `https://kind-plum-woolens.cyclic.app/studentData/${stuDelHT}`;
      
          let deleteMethod = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
      
          const response = await fetch(dbUrl, deleteMethod);
          const jsonData = await response.json();
      
          console.log(jsonData);
          let responseMsg = jsonData.message;
          if (responseMsg === "Data deleted successfully!") {
            delReqErrMsg.textContent = "Student data deleted successfully!";
            delReqErrMsg.classList.add("text-success");
          } else if (responseMsg === "Entry not found") {
            if (delReqErrMsg.classList.contains("text-success")) {
              delReqErrMsg.classList.remove("text-success");
            }
            delReqErrMsg.textContent = `The student with ${stuDelHT} hallticket number does not exist in our database.`;
          } else {
            delReqErrMsg.textContent = jsonData.message;
          }
        } catch (error) {
          alert("An error occurred while deleting the data: " + error.message);
          console.error(error);
        }
    }
    
    deleteData();
      
}


let delReqBtn = document.getElementById("delReqBtn");
let delbtn = document.getElementById("delbtn");
let studDataDelInput = document.getElementById("studDataDelInput");

studDataDelInput.addEventListener("blur",()=>{
    if(studDataDelInput.value.length === 10){
        delbtn.setAttribute("data-mdb-toggle", "modal")
        delbtn.setAttribute("data-mdb-target", "#delConfirmModal")
    }else{
        delbtn.removeAttribute("data-mdb-toggle");
        delbtn.removeAttribute("data-mdb-target");
    }
})


delbtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let delReqErrMsg = document.getElementById("delReqErrMsg");
    let stuDelHT = parseInt(studDataDelInput.value);

    delReqErrMsg.textContent = "";
    

    if(studDataDelInput.value !== ""){
        if(delReqErrMsg.classList.contains("text-success")){
            delReqErrMsg.classList.remove("text-success");
        }

        if(studDataDelInput.value.length === 10){
            delReqBtn.onclick = ()=>{
                delStudentData(delReqErrMsg, stuDelHT);
            }
        }else{
            if(studDataDelInput.value.length < 10){
                delReqErrMsg.textContent = "Hallticket number must be 10 Digits."
            }
        }
    }else{
        delReqErrMsg.textContent = "Please enter hallticket number.";
    }


    setTimeout(function() {
    delReqErrMsg.textContent = '';
    }, 10000);


})



// -----------------------Update Results -------------------------------------------------------------------

let uFatherName = document.getElementById("uFatherName");
let uMotherName = document.getElementById("uMotherName");
let uMonthYrOfPass = document.getElementById("uMonthYrOfPass");

let uY1English = document.getElementById("uY1English");
let uY1Sl = document.getElementById("uY1Sl");
let uY1MathsA = document.getElementById("uY1MathsA");
let uY1MathsB = document.getElementById("uY1MathsB");
let uY1Phy = document.getElementById("uY1Phy");
let uY1Chem = document.getElementById("uY1Chem");

let uY2English = document.getElementById("uY2English");
let uY2Sl = document.getElementById("uY2Sl");
let uY2MathsA = document.getElementById("uY2MathsA");
let uY2MathsB = document.getElementById("uY2MathsB");
let uY2Phy = document.getElementById("uY2Phy");
let uY2Chem = document.getElementById("uY2Chem");
let uY2PhyPractical = document.getElementById("uY2PhyPractical");
let uY2ChemPractical = document.getElementById("uY2ChemPractical");

let availToUpdateList = [uFatherName,uMotherName,uMonthYrOfPass,
    uY1English,uY1Sl,uY1MathsA,uY1MathsB,uY1Phy,uY1Chem,
    uY2English,uY2Sl,uY2MathsA,uY2MathsB,uY2Phy,uY2Chem,uY2PhyPractical,uY2ChemPractical
]
let availToUpdateListIds = ["uFatherNameInput","uMotherNameInpt","uMonthYrOfPassInput",
    "uY1EnglishInput","uY1SlInput","uY1MathsAInput","uY1MathsBInput","uY1PhyInput","uY1ChemInput",
    "uY2EnglishInput","uY2SlInput","uY2MathsAInput","uY2MathsBInput","uY2PhyInput","uY2ChemInput","uY2PhyPracticalInput","uY2ChemPracticalInput"
]

let inputElPlaceholders = [
    "Enter Father Name",
    "Enter Mother Name",
    "Enter Month and Year of Pass",
    "Enter Year Ⅰ English Marks ",
    "Enter Year Ⅰ Second Language Marks ",
    "Enter Year Ⅰ Maths A Marks ",
    "Enter Year Ⅰ Maths B Marks ",
    "Enter Year Ⅰ Physics Marks ",
    "Enter Year Ⅱ Chemistry Marks ",
    "Enter Year Ⅱ English Marks ",
    "Enter Year Ⅱ Second Language Marks ",
    "Enter Year Ⅱ Maths A Marks ",
    "Enter Year Ⅱ Maths B Marks ",
    "Enter Year Ⅱ Physics Marks ",
    "Enter Year Ⅱ Chemistry Marks ",
    "Enter Year Ⅱ Physics Practical Marks ",
    "Enter Year Ⅱ Chemistry Practical Marks ",
]

let inputElements = {};

function addInputElement(inputElId, placeholder) {
  let updateBodyContainer = document.getElementById("updateBodyContainer");

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4");
  updateBodyContainer.appendChild(inputContainer);

  let inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("id", inputElId);
  inputEl.setAttribute("placeholder", placeholder);
  inputEl.classList.add("form-control", "input-text");
  inputContainer.appendChild(inputEl);

  inputElements[inputElId] = inputContainer;
}

function removeInputElement(inputElId) {
  let container = inputElements[inputElId];
  if (container) {
    container.remove();
    delete inputElements[inputElId];
  }
}

let checkedItems = [];

for (let i = 0; i < availToUpdateList.length; i++) {
    (function (inputElId) {
        availToUpdateList[i].addEventListener("change", () => {
        if (availToUpdateList[i].checked === true) {
            let placeholder = inputElPlaceholders[i];
            checkedItems.push(availToUpdateListIds[i])
            addInputElement(inputElId, placeholder);
        } else {
            removeInputElement(inputElId);
            
            let index = checkedItems.indexOf(inputElId)
            checkedItems.splice(index,1);
            // console.log(checkedItems.slice(index, index + 1))
        }
        console.log(checkedItems)

        if(checkedItems.length >= 1){
            document.getElementById("submitContainer").classList.remove("d-none")
        }else{
            document.getElementById("submitContainer").classList.add("d-none")

        }
        
    });
})(availToUpdateListIds[i]);
}



// method put or update ----------------------------------------------------------------


//correct code
// let updateBody = {
//     student_details:{
//     father_name: "Raj"
// }
//   };

//     let updateUrl = "https://kind-plum-woolens.cyclic.app/studentData/1987654321"
  
//   fetch(updateUrl)
//     .then((response) => response.json())
//     .then((student) => {
//       // Update only the name field

  
//       let putMethod = {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify()
//       };
  
//       return fetch(updateUrl, putMethod);
//     })
//     .then((response) => response.json())
//     .then((jsonData) => {
//       console.log(jsonData);
//     });
  
// -----------------------Access Results -------------------------------------------------------------------

let accResultInput = document.getElementById("accResultInput");
let accResSubmitBtn = document.getElementById("accResSubmitBtn");
let resSpinner = document.getElementById("resSpinner");
let resultContainer = document.getElementById("resultContainer");

let resName = document.getElementById("resName");
let resFname = document.getElementById("resFname");
let resMname = document.getElementById("resMname");
let resMedium = document.getElementById("resMedium");
let resHT = document.getElementById("resHT");
let resMYpass = document.getElementById("resMYpass");
let resCourse = document.getElementById("resCourse");


let res1eng = document.getElementById("res1eng");
let res1SL = document.getElementById("res1SL");
let res1MA = document.getElementById("res1MA");
let res1MB = document.getElementById("res1MB");
let res1phy = document.getElementById("res1phy");
let res1chem = document.getElementById("res1chem");


let res2eng = document.getElementById("res2eng");
let res2SL = document.getElementById("res2SL");
let res2MA = document.getElementById("res2MA");
let res2MB = document.getElementById("res2MB");
let res2phy = document.getElementById("res2phy");
let res2chem = document.getElementById("res2chem");
let res2PhyPract = document.getElementById("res2PhyPract");
let res2ChemPract = document.getElementById("res2ChemPract");

let resTotalMarks = document.getElementById("resTotalMarks");
let resGrade = document.getElementById("resGrade");

let resReqErrMsg = document.getElementById("resReqErrMsg");

function getResult(){

    function setResults(jsonData){

        let {name, hallticket} = jsonData.data;
        let {grade, marks} = jsonData.data.result;
        let {course, date_of_birth, father_name, mother_name, medium, month_and_year_of_pass} = jsonData.data.student_details;
        let{english_1, second_lang_1, maths_a_1, maths_b_1, physics_1, chemistry_1} = jsonData.data.obtained_marks.year_one;
        let{english_2, second_lang_2, maths_a_2, maths_b_2, physics_2, chemistry_2, physics_practical_2, chemistry_practical_2} = jsonData.data.obtained_marks.year_two;

        resName.textContent = name;
        resFname.textContent = father_name;
        resMname.textContent = mother_name;
        resMedium.textContent = medium;
        resHT.textContent = hallticket;
        resMYpass.textContent = month_and_year_of_pass;
        resCourse.textContent = course;

        res1eng.textContent = english_1;
        res1SL.textContent = second_lang_1;
        res1MA.textContent = maths_a_1;
        res1MB.textContent = maths_b_1;
        res1phy.textContent = physics_1;
        res1chem.textContent = chemistry_1;

        res2eng.textContent = english_2;
        res2SL.textContent = second_lang_2;
        res2MA.textContent = maths_a_2;
        res2MB.textContent = maths_b_2;
        res2phy.textContent = physics_2;
        res2chem.textContent = chemistry_2;
        res2PhyPract.textContent = physics_practical_2;
        res2ChemPract.textContent = chemistry_practical_2;

        resTotalMarks.textContent ="TOTAL MARKS : " + marks;
        resGrade.textContent = "GRADE : " + grade;

    }


    async function getData() {
        try {
          let getMethod = {
            method: "GET",
          };
      
          let getResURL = `https://kind-plum-woolens.cyclic.app/studentData/${parseInt(
            accResultInput.value
          )}`;
      
          const response = await fetch(getResURL, getMethod);
          const jsonData = await response.json();
      
          console.log(jsonData);
      
          let responseMsg = jsonData.message;
          if (responseMsg === "Entry retrieved successfully!") {
            resReqErrMsg.textContent = "";
            setResults(jsonData);
            resSpinner.classList.add("d-none");
            resultContainer.classList.remove("d-none");
          } else {
            if (responseMsg === "Entry not found") {
              resSpinner.classList.add("d-none");
              resReqErrMsg.textContent = `The student with ${accResultInput.value} hallticket number does not exist in our database.`;
            } else {
              resReqErrMsg.textContent = jsonData.message;
            }
          }
        } catch (error) {
          alert("An error occurred while fetching the data: " + error.message);
          console.error(error);
        }
    }
    
    getData();
      
}

accResSubmitBtn.addEventListener("click",()=>{
    
    if(accResultInput.value !== ""){
        if(accResultInput.value.length === 10){
            getResult();
            resSpinner.classList.remove("d-none");
            resultContainer.classList.add("d-none");
        }else{
            if(accResultInput.value.length < 10){
                resReqErrMsg.textContent = "Hallticket number must be 10 Digits."
            }
        }
    }else{
        resReqErrMsg.textContent = "Please enter hallticket number.";
    }
})


//student list 

function appendEachStudent(eachStudent, serialNumber){
    let studentEachListContainer = document.getElementById('studentEachListContainer');

    let mainDiv = document.createElement("div");
    mainDiv.classList.add("my-2","row", "input-label", "m-0")
    studentEachListContainer.appendChild(mainDiv);

    let serialNoEl = document.createElement("div");
    let stuHtEl = document.createElement("div");
    let stuNameEl = document.createElement("div");
    let stuMarksEl = document.createElement("div");
    let stuGradeEl = document.createElement("div");

    mainDiv.appendChild(serialNoEl);
    mainDiv.appendChild(stuHtEl);
    mainDiv.appendChild(stuNameEl);
    mainDiv.appendChild(stuMarksEl);
    mainDiv.appendChild(stuGradeEl);

    serialNoEl.classList.add("text-center", "col-2", "col-sm-2","pl-0","pr-2", "px-sm-2");
    stuHtEl.classList.add("text-center", "col-3", "col-sm-3","pl-0","pr-2", "px-sm-2");
    stuNameEl.classList.add("text-left","text-sm-center", "col-3", "col-sm-3","pl-0","pr-2", "px-sm-2");
    stuMarksEl.classList.add("text-center", "col-2", "col-sm-2","pl-0","pr-2", "px-sm-2");
    stuGradeEl.classList.add("text-center", "col-2", "col-sm-2","pl-0","pr-2", "px-sm-2");

    let serialNo = document.createElement("p");
    serialNo.textContent = serialNumber;
    serialNoEl.appendChild(serialNo);

    let stuHtNum =  document.createElement("p");
    stuHtNum.textContent = eachStudent.hallticket;
    stuHtEl.appendChild(stuHtNum);

    let stuName = document.createElement("p");
    stuName.textContent = eachStudent.name;
    stuNameEl.appendChild(stuName);
    
    let stuMarks =  document.createElement("p");
    stuMarks.textContent = eachStudent.result.marks;
    stuMarksEl.appendChild(stuMarks);

    let stuGrade =  document.createElement("p");
    stuGrade.textContent = eachStudent.result.grade;
    stuGradeEl.appendChild(stuGrade);


}

function loopStudentData(){
    document.getElementById("stuListSpinner").classList.remove("d-none")
    async function getData() {
        try {
          let getMethod = {
            method: "GET",
          };
      
          let hostUrl = "https://kind-plum-woolens.cyclic.app/studentData";
      
          const response = await fetch(hostUrl, getMethod);
          const jsonData = await response.json();
      
          console.log(jsonData);
          for (let i = 0; i < jsonData.length; i++) {
            appendEachStudent(jsonData[i], i + 1);
          }
          document.getElementById("stuListSpinner").classList.add("d-none");
        } catch (error) {
          alert("An error occurred while fetching the data: " + error.message);
          console.error(error);
        }
    }
    
    getData();
    
}

loopStudentData();



