
               // ============ HELPERS ============
        function toBangla(n) {
            const d = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
            return String(n).replace(/\d/g, c => d[+c]);
        }