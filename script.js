document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("downloadPDF").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: "p", // Portrait
            unit: "mm",
            format: "a4",
            compress: true // Reduce file size
        });

        const resume = document.getElementById("resume");

        html2canvas(resume, {
            scale: 3, // High-quality capture
            useCORS: true,
            scrollX: 0,
            scrollY: 0
        }).then(canvas => {
            const imgData = canvas.toDataURL("image/png");

            // A4 dimensions: 210mm x 297mm (remove extra white space)
            const pdfWidth = 210;
            const pdfHeight = 297;

            let imgWidth = pdfWidth;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Scale down if needed
            if (imgHeight > pdfHeight) {
                imgHeight = pdfHeight;
            }

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            pdf.save("Vishwas_Raut_resume.pdf");
        });
    });

    document.getElementById("downloadDOC").addEventListener("click", function () {
        const resumeContent = document.getElementById("resume").innerHTML;
        const blob = new Blob(["\ufeff" + resumeContent], { type: "application/msword" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Vishwas_Raut_resume.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
