import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  } catch {
    alert("Failed to copy to clipboard.");
  }
};

export const exportInsightsTxt = (insights, fileName = "insights.txt") => {
  const blob = new Blob(
    [insights.map((i) => `${i.type}: ${i.text}`).join("\n\n")],
    { type: "text/plain;charset=utf-8" }
  );
  saveAs(blob, fileName);
};

export const exportInsightsPdf = (insights, filename, chartImageDataUrl) => {
  const doc = new jsPDF();

  let yOffset = 10;

  insights.forEach(({ type, text }) => {
    doc.setFontSize(14);
    doc.text(type, 10, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 10, yOffset);
    yOffset += splitText.length * 10;
  });

  if (chartImageDataUrl) {
    yOffset += 10;
    doc.addImage(chartImageDataUrl, "PNG", 10, yOffset, 180, 100);
  }

  doc.save(filename);
};

export const shareInsights = async (
  insights,
  fileName,
  token,
  setShareLink,
  setShareId
) => {
  if (!insights.length) throw new Error("No insights to share");
  try {
    const res = await axios.post(
      `${BASE_URL}/api/insights/share`,
      { fileName, insights },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const link = res.data.url;
    setShareLink(link);
    const id = link.split("/").pop();
    setShareId(id);
    await navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  } catch (err) {
    throw new Error("Failed to generate share link.");
  }
};

export const emailShare = async (email, shareId, token) => {
  if (!email || !shareId) throw new Error("Invalid email or share ID");
  try {
    await axios.post(
      `${BASE_URL}/api/insights/email`,
      { email, shareId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Email sent successfully!");
  } catch {
    throw new Error("Failed to send email.");
  }
};
