import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).send("Project ID is required");
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Replace with the URL of the detail page
    const url = `http://localhost:3000/project-detail/${projectId}`;
    await page.goto(url, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Send PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=project-${projectId}.pdf`
    );
    res.send(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
}
