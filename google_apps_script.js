function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  
  let headerRowIndex = findHeaderRow(data);
  const headers = data[headerRowIndex].map(h => h.toString().trim());
  const jsonRows = [];
  
  for (let i = headerRowIndex + 1; i < data.length; i++) {
    const row = data[i];
    if (row.every(cell => !cell)) continue;
    
    const obj = {};
    headers.forEach((header, index) => {
      if (header) obj[header] = row[index];
    });
    jsonRows.push(obj);
  }
  
  return ContentService.createTextOutput(JSON.stringify(jsonRows))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  
  let name = "";
  let attendance = "";
  let eventName = "";
  
  try {
    const payload = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
    name = (payload.name || "").trim();
    attendance = (payload.attendance || "").trim();
    eventName = (payload.event || "").trim();
  } catch (err) {
    name = e.parameter.name || "";
    attendance = e.parameter.attendance || "";
    eventName = e.parameter.event || "";
  }
  
  const headerRowIndex = findHeaderRow(data);
  const headers = data[headerRowIndex].map(h => h.toString().trim());
  const statusIdx = headers.indexOf("Attendance Status");
  const timestampIdx = headers.indexOf("Timestamps");
  const titleIdx = headers.indexOf("Title2");
  const firstNameIdx = headers.indexOf("First Name");
  const lastNameIdx = headers.indexOf("Last Name");
  const spouseKidsIdx = headers.indexOf("Spouse/Kids");
  const familyIdx = headers.indexOf("Family");
  
  if (statusIdx === -1) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: "Attendance Status column not found"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  let matchFound = false;
  for (let i = headerRowIndex + 1; i < data.length; i++) {
    const title = titleIdx !== -1 ? (data[i][titleIdx] || "").toString().trim() : "";
    const firstName = firstNameIdx !== -1 ? (data[i][firstNameIdx] || "").toString().trim() : "";
    const lastName = lastNameIdx !== -1 ? (data[i][lastNameIdx] || "").toString().trim() : "";
    const spouseKids = spouseKidsIdx !== -1 ? (data[i][spouseKidsIdx] || "").toString().trim() : "";
    const family = familyIdx !== -1 ? (data[i][familyIdx] || "").toString().trim() : "";
    
    // Construct exact displayName to match what is sent from index.html / invitation URL
    const parts = [];
    if (title) parts.push(title);
    if (firstName) parts.push(firstName);
    if (lastName) parts.push(lastName);
    if (spouseKids) parts.push(spouseKids);
    if (family) parts.push(family);
    
    const displayName = parts.join(" ");
    const fullName = (firstName + " " + lastName).trim();
    
    // Compare against displayName, fullName, and firstName to ensure maximum compatibility
    if (displayName.toLowerCase() === name.toLowerCase() || 
        fullName.toLowerCase() === name.toLowerCase() || 
        firstName.toLowerCase() === name.toLowerCase()) {
      
      const currentStatus = (sheet.getRange(i + 1, statusIdx + 1).getValue() || "").toString().trim();
      let newStatus = attendance;

      if (eventName) {
        // Example: Wedding Attending, Home Coming Declined
        let statuses = currentStatus ? currentStatus.split(',').map(s => s.trim()) : [];
        
        // Remove old entry for this event if it exists
        statuses = statuses.filter(s => !s.toLowerCase().startsWith(eventName.toLowerCase()));
        
        // Add new entry
        statuses.push(`${eventName} ${attendance.toLowerCase()}`);
        newStatus = statuses.join(', ');
      }
        
      sheet.getRange(i + 1, statusIdx + 1).setValue(newStatus);
      
      if (timestampIdx !== -1) {
        sheet.getRange(i + 1, timestampIdx + 1).setValue(new Date());
      }
      matchFound = true;
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({result: matchFound ? "success" : "not_found"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function findHeaderRow(data) {
  for (let i = 0; i < Math.min(data.length, 10); i++) {
    if (data[i].some(cell => cell && cell.toString().includes("First Name"))) return i;
  }
  return 0;
}
