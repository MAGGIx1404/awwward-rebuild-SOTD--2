function wrapInAnch(str, start, end, link, index = -99999) {
  let s = `<a href=${link} class="intro_hover_btn" data-link-index=${index}>`;
  for (let i = start; i < end; i++) {
    s += str[i];
  }
  s += "</a>";
  return s;
}

function wrapInB(str, start, end) {
  let s = "<strong>";
  for (let i = start; i < end; i++) {
    s += str[i];
  }
  s += "</strong>";
  return s;
}

export function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>");
}

export function wrapWordsInH2(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<h2>$&</h2>");
}

export default function handleRichText(arr, isIndexApplied) {
  const array = [];
  arr.forEach((item) => {
    let count = 0;
    const p = item.text;
    if (item.spans.length !== 0) {
      let temp = p;
      const links = item.spans.filter((span) => {
        return span.type === "hyperlink" ? span : null;
      });
      const bolds = item.spans.filter((span) => {
        return span.type === "strong" ? span : null;
      });
      if (links.length !== 0) {
        links.forEach((link) => {
          let aS;
          if (isIndexApplied) {
            aS = wrapInAnch(p, link.start, link.end, link.data.url, count++);
          } else {
            aS = wrapInAnch(p, link.start, link.end, link.data.url);
          }
          let searchText = "";
          for (let i = link.start; i < link.end; i++) {
            searchText += p[i];
          }
          temp = temp.replace(searchText, aS);
        });
      }
      if (bolds.length !== 0) {
        bolds.forEach((bold) => {
          const aS = wrapInB(p, bold.start, bold.end);
          let searchText = "";
          for (let i = bold.start; i < bold.end; i++) {
            searchText += p[i];
          }
          temp = temp.replace(searchText, aS);
        });
      }

      array.push(temp + "<br/>");
    } else {
      array.push(p + "<br/>");
    }
  });

  let s = "<p>";
  array.forEach((l) => {
    s += l;
  });
  s += "</p>";
  return s;
}
