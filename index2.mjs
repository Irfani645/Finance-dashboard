document.addEventListener('DOMContentLoaded', () => {
    const patientForm = document.getElementById('patientForm');
    const patientDataDiv = document.getElementById('patientData');
    let patients = [];

    function clearForm() {
        patientForm.reset();
    }

    function renderPatients() {
        patientDataDiv.innerHTML = '';
        patients.forEach((patient, index) => {
            const patientDiv = document.createElement('div');
            patientDiv.className = 'patient';

            const patientInfo = `
                <p><strong>Name:</strong> ${patient.name}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Gender:</strong> ${patient.gender}</p>
                <p><strong>Contact:</strong> ${patient.contact}</p>
                <p><strong>Address:</strong> ${patient.address}</p>
                <p><strong>Treatment Cost:</strong> Rs ${patient.treatmentCost} /-</p>
                <p><strong>Insurance:</strong> ${patient.insurance}</p>
                <p><strong>Payment Status:</strong> ${patient.paymentStatus}</p>
                <p><strong>Stay Duration:</strong> ${patient.stayDuration} days</p>
                <p><strong>Treatment Type:</strong> ${patient.treatmentType}</p>
                <p><strong>Discount:</strong> ${patient.discount}%</p>
                <p><strong>Payment Mode:</strong> ${patient.paymentMode}</p>
                <div>Created By Assistant Manager Finance :   Irshad Khan </div>
                <div>Approved By Finance Manager :             Majid Khan </div>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
                <button class="download-pdf" data-index="${index}">Download PDF</button>
            `;
            patientDiv.innerHTML = patientInfo;
            patientDataDiv.appendChild(patientDiv);
        });

        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', editPatient);
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', deletePatient);
        });

        document.querySelectorAll('.download-pdf').forEach(button => {
            button.addEventListener('click', downloadPDF);
        });
    }

    function savePatient(event) {
        event.preventDefault();

        const newPatient = {
            name: patientForm.name.value,
            age: patientForm.age.value,
            gender: patientForm.gender.value,
            contact: patientForm.contact.value,
            address: patientForm.address.value,
            treatmentCost: patientForm.treatmentCost.value,
            insurance: patientForm.insurance.value,
            paymentStatus: patientForm.paymentStatus.value,
            stayDuration: patientForm.stayDuration.value,
            treatmentType: patientForm.treatmentType.value,
            discount: patientForm.discount.value,
            paymentMode: patientForm.paymentMode.value
        };

        const index = patientForm.dataset.index;
        if (index) {
            patients[index] = newPatient;
        } else {
            patients.push(newPatient);
        }

        clearForm();
        delete patientForm.dataset.index;
        renderPatients();
    }

    function editPatient(event) {
        const index = event.target.dataset.index;
        const patient = patients[index];

        patientForm.name.value = patient.name;
        patientForm.age.value = patient.age;
        patientForm.gender.value = patient.gender;
        patientForm.contact.value = patient.contact;
        patientForm.address.value = patient.address;
        patientForm.treatmentCost.value = patient.treatmentCost;
        patientForm.insurance.value = patient.insurance;
        patientForm.paymentStatus.value = patient.paymentStatus;
        patientForm.stayDuration.value = patient.stayDuration;
        patientForm.treatmentType.value = patient.treatmentType;
        patientForm.discount.value = patient.discount;
        patientForm.paymentMode.value = patient.paymentMode;

        patientForm.dataset.index = index;
    }

    function deletePatient(event) {
        const index = event.target.dataset.index;
        patients.splice(index, 1);
        renderPatients();
    }

    async function downloadPDF(event) {
        const index = event.target.dataset.index;
        const patient = patients[index];

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.text(`Patient Information`, 14, 20);
        
        doc.autoTable({
            startY: 30,
            head: [['Field', 'Value']],
            body: [
                ['Name', patient.name],
                ['Age', patient.age],
                ['Gender', patient.gender],
                ['Contact', patient.contact],
                ['Address', patient.address],
                ['Treatment Cost', patient.treatmentCost],
                ['Insurance', patient.insurance],
                ['Payment Status', patient.paymentStatus],
                ['Stay Duration', `${patient.stayDuration} days`],
                ['Type of Treatment', patient.treatmentType],
                ['Discount', `${patient.discount}%`],
                ['Payment Mode', patient.paymentMode]
            ]
        });

        doc.save(`${patient.name}_Patient_Info.pdf`);
    }

    patientForm.addEventListener('submit', savePatient);
});
