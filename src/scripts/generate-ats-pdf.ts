import { jsPDF } from 'jspdf';

interface CVData {
  basics: any;
  work: any[];
  education: any[];
  certificates: any[];
  skills: any[];
  languages: any[];
  projects: any[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Actual';
  const d = new Date(dateStr);
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${m}/${d.getUTCFullYear()}`;
}

export function generateATSPdf(cv: CVData) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const margin = 18;
  const contentW = pageW - 2 * margin;
  let y = 20;

  function checkPage(needed: number = 10) {
    if (y + needed > 280) {
      doc.addPage();
      y = 18;
    }
  }

  function addLine(text: string, size: number, style: string = 'normal', indent: number = 0) {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    const lines = doc.splitTextToSize(text, contentW - indent);
    for (const line of lines) {
      checkPage(size * 0.42);
      doc.text(line, margin + indent, y);
      y += size * 0.42;
    }
  }

  function addSectionHeader(title: string) {
    y += 5;
    checkPage(12);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin, y);
    y += 1;
    doc.setDrawColor(0);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
  }

  // ── HEADER ──
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(cv.basics.name.toUpperCase(), margin, y);
  y += 6;

  addLine(cv.basics.label, 10.5, 'normal');
  y += 2;

  const contactLine = [
    `${cv.basics.location.city}, ${cv.basics.location.region}, Chile`,
    cv.basics.phone,
    cv.basics.email,
  ].join('  |  ');
  addLine(contactLine, 9, 'normal');
  y += 1;

  if (cv.basics.profiles?.length) {
    const profilesLine = cv.basics.profiles
      .map((p: any) => `${p.network}: ${p.url}`)
      .join('  |  ');
    addLine(profilesLine, 8, 'normal');
  }

  // ── PERFIL ──
  addSectionHeader('Perfil Profesional');
  addLine(cv.basics.summary, 9.5);

  // ── EXPERIENCIA ──
  addSectionHeader('Experiencia Laboral');
  cv.work.forEach((job: any) => {
    checkPage(20);

    // Position + date on same line
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(job.position, margin, y);
    const dateStr = `${formatDate(job.startDate)} \u2013 ${formatDate(job.endDate)}`;
    doc.setFont('helvetica', 'normal');
    doc.text(dateStr, pageW - margin, y, { align: 'right' });
    y += 4.5;

    // Company
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    doc.text(job.name, margin, y);
    y += 5;

    // Summary
    addLine(job.summary, 9.5);

    // Highlights
    if (job.highlights?.length) {
      y += 1;
      addLine('Tecnologias: ' + job.highlights.join(', '), 9, 'italic');
    }
    y += 4;
  });

  // ── EDUCACIÓN ──
  addSectionHeader('Formacion Academica');
  cv.education.forEach((edu: any) => {
    checkPage(12);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(edu.area, margin, y);
    const yrs = `${new Date(edu.startDate).getUTCFullYear()} \u2013 ${new Date(edu.endDate).getUTCFullYear()}`;
    doc.setFont('helvetica', 'normal');
    doc.text(yrs, pageW - margin, y, { align: 'right' });
    y += 4.5;
    const sub = `${edu.institution}${edu.duration ? '  \u00B7  ' + edu.duration : ''}`;
    addLine(sub, 9.5);
    y += 3;
  });

  // ── CERTIFICACIONES ──
  if (cv.certificates?.length) {
    addSectionHeader('Certificaciones');
    cv.certificates.forEach((cert: any) => {
      checkPage(6);
      const yr = new Date(cert.date).getUTCFullYear();
      const line = `${cert.name} \u2014 ${cert.issuer} (${yr})${cert.hours ? '  \u00B7  ' + cert.hours : ''}`;
      addLine(line, 9.5);
      y += 1.5;
    });
  }

  // ── HABILIDADES ──
  addSectionHeader('Habilidades Tecnicas');
  const skillNames = cv.skills.map((s: any) => s.name).join(', ') + '.';
  addLine(skillNames, 9.5);

  // ── PROYECTOS ──
  if (cv.projects?.length) {
    addSectionHeader('Proyectos Destacados');
    cv.projects.forEach((proj: any) => {
      checkPage(15);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(proj.name, margin, y);
      y += 4.5;
      addLine(proj.description, 9.5);
      if (proj.highlights?.length) {
        y += 1;
        addLine('Tecnologias: ' + proj.highlights.join(', '), 9, 'italic');
      }
      if (proj.url) {
        addLine(proj.url, 8, 'normal');
      }
      y += 3;
    });
  }

  // ── IDIOMAS ──
  if (cv.languages?.length) {
    addSectionHeader('Idiomas');
    cv.languages.forEach((lang: any) => {
      addLine(`${lang.language}: ${lang.fluency}`, 9.5);
      y += 1;
    });
  }

  // Generate filename from name
  const filename = cv.basics.name
    .split(' ')
    .slice(0, 2)
    .join('_')
    .replace(/[^a-zA-Z_]/g, '') + '_CV.pdf';

  doc.save(filename);
}
