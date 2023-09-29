// Oppgaven:
 
// Oppgaven er:
// - Ta imot tre år med inntekt, og returnere om bruker har rett på dagpenger. Inntekten er én sum per kalenderår.
// - Hvis brukeren har rett på dagpenger skal du også returnere dagsatsen.
// - Bruk enten Java, JavaScript eller Kotlin, det er ingen krav om UI.
// - Besvarelsen skal inneholde tester.
 


const readline = require('readline');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const G = 120000; // Runder opp grunnbelopet fra 118 620kr til 120 000kr for enkelhets skyld
                 // Maks dagpenger = (120 000 * 6) / 260 = 2 769,2 => 2 770kr

class Dagpenger {
    constructor(inntekt2020, inntekt2021, inntekt2022, navn) {
        this.inntekt2020 = inntekt2020;
        this.inntekt2021 = inntekt2021;
        this.inntekt2022 = inntekt2022;
        this.navn = navn; // (Unødvendig)
    }

    kvalifisererTilDagpenger() {
        this.totalInntekt = Number(this.inntekt2020) + Number(this.inntekt2021) + Number(this.inntekt2022); 
        return this.totalInntekt > 3 * G || this.inntekt2022 > 1.5 * G;
    }

    beregnDagsats() {
        if (this.kvalifisererTilDagpenger() == false)  { 
            return 0;
        } 
        else {
            const dagPengeGrunnlag = Math.min(Math.max(this.inntekt2022, (this.totalInntekt / 3)), 6 * G);
            //console.log(this.totalInntekt)
            return Math.ceil(dagPengeGrunnlag / 260);
        }
    }
    hilsen() {
        return `\nHei ${this.navn},\n\nTakk for at du besøkte NAV.no.\nHer er ditt resultat:\n`;
    }

    resultat() {
        const harRettTilDagpenger = this.kvalifisererTilDagpenger() ? 
            'Du kvalifiserer til dagpenger' : 
            'Du kvalifiserer dessverre ikke til dagpenger.';

        const dagSats = `Din dagsats er ${this.beregnDagsats()} kr.`;
        return `${harRettTilDagpenger}\n${dagSats}`;
    };
}

velkommenTilNav = () => {

    validerInput = (tekst, callback) => {
        input.question(tekst, (inntekt) => {
            if (isNaN(inntekt) || inntekt.trim() === "") {
                console.log('Vennligst oppgi en gyldig inntekt.');
                validerInput(tekst, callback);
            } else {
                callback(inntekt);
            }
        });
    }
    
    input.question("Navn: ", (navn) => {
        validerInput("Inntekt for 2020: ", (inntekt2020) => {
            validerInput("Inntekt for 2021: ", (inntekt2021) => {
                validerInput("Inntekt for 2022: ", (inntekt2022) => {
                    const pers1 = new Dagpenger(inntekt2020, inntekt2021, inntekt2022, navn);
                    console.log(pers1.hilsen());
                    console.log(pers1.resultat());
                    input.close();
                });
            });
        });  
    });

}



// ------------------------------ TEST -----------------------------------

// Kvalifiserer
const test1 = new Dagpenger(400000, 450000, 500000, "Ola Nordmann");
console.log(test1.hilsen());
console.log(test1.resultat());


// Kvalifiserer akkurat IKKE
const test2 = new Dagpenger(120000, 120000, 120000, "Onkel Skrue");
console.log(test2.hilsen());
console.log(test2.resultat());


// Kvalifiserer akkurat
const test3 = new Dagpenger(120000, 120000, 120001, "Tore Hjelmeset");
console.log(test3.hilsen());
console.log(test3.resultat());


// Kvalifiserer med god margin. Får maks dagpenger
const test4 = new Dagpenger(1000000, 1000000, 1000000, "Onkel Skrue");
console.log(test4.hilsen());
console.log(test4.resultat());

// Kvalifiserer med god margin. Får maks dagpenger
const test5 = new Dagpenger(0, 0, 500000, "Heidi");
console.log(test5.hilsen());
console.log(test5.resultat());

// Kvalifiserer med god margin. Får maks dagpenger
const test6 = new Dagpenger(500000, 0, 0, "Jens");
console.log(test6.hilsen());
console.log(test6.resultat());



// Kjører denne etter testene: 
velkommenTilNav()

