import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

// Cesta k souboru s poznámkami (kartičkami) – změň podle toho, kam soubor umístíš
const filePath = 'content/english/unit-1-notes.md'; // Zkontroluj správnost cesty

// Endpoint pro GET požadavek
export const GET = async () => {
	try {
		const data = fs.readFileSync(filePath, 'utf8');
		// další zpracování souboru
	} catch (error) {
		console.error('Error reading file:', error);
	}
};

// Funkce pro extrakci otázek a odpovědí z Markdown souboru
const extractCardsFromMarkdown = (markdown: string) => {
	// Ukázková logika pro extrakci otázek a odpovědí
	// Můžeš upravit dle své struktury v markdownu
	const lines = markdown.split('\n');
	const cards = [];

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith('**')) {
			// Hledáme otázky (např. zvýrazněné tučně)
			const question = lines[i].replace('**', '').replace('**', '').trim(); // Odstraníme ** z otázek
			const answer = lines[i + 1].trim(); // Odpověď na následující řádek
			cards.push({ question, answer });
		}
	}

	return cards;
};
