# IvisPro Katja Pott

Publiziert unter https://katjapott.github.io/IvisPro/

### About

Das Projekt funktioniert mit D3 v4. Es zeigt die Unfälle im Kanton Zürich zwischen 2010 - 2016.

Ebenfalls zeigt es den Zusammenhang zwischen den zugelassenen Autos pro Ort und den Unfällen im Durchschnitt aller sechs Jahre.

Die Daten der Unfälle und zugelassenen Autos wurden mit Trifacta zusammengefügt und gefiltert.

### Feautures

Hover Effekt bei den Gemeinden. Der Gemeindename wird angezeigt und das Histogram für den ausgewählten Ort wird angezeigt.

Hover Eeffekt bei den zugelassenen Autos. Der Durchscnitt der zugelassenen Autos und Unfälle der sechs Jahre wird angezeigt.

Einfärbung der Gemeinden nach Durchschnitt der Unfälle in den sechs Jahren.

### Data Sources

Zugelassene Personenwagen https://opendata.swiss/de/dataset/strassenfahrzeugbestand-personenwagen-ab-19901
Unfälle pro 1000 Einwohner https://opendata.swiss/de/dataset/unfalle-pro-1000-einw
Swiss Maps https://github.com/interactivethings/swiss-maps

### Reflexion

Zuerst habe ich versucht mit Tableau einige Informationen von den Files darzustellen, damit ich eine Idee beokmmen habe, wie ich die Daten visualisieren möchte, eventuell auch schon einige Zusammenhänge sehe. 

Die Daten der Unfälle und zugelassenen Autos habe ich mit Trifacta zusammengefügt und gefiltert. Da die Daten vom Bund und der Stadt Zürich stammen, enthielten die Files relativ viel redundante Informationen. Dies hat mich sehr viel Zeit gekostet, da ich noch wenig Erfahrung mit Trifacta hatte.

Zuerst habe ich die vorhandenen Files vom Scatterplot vom Unterricht angepasst, um zu lernen, wie d3 funktioniert, da ich vorher noch nie mit d3 und JavaScript gearbeitet habe. Anschliessend habe ich versucht die Karte von der Stadt Zürich zu generieren. Die Funktion von SwissMaps hat mir hier sehr viel geholfen. Jedoch waren alle Templates auf Version 3. Dies musste ich abändern auf Version 4, was ich sehr schwierig fand.

Anschliessend habe ich das Histogram erstellt. Hier hatte ich Probleme die Daten zu filtern und richtig darzustellen. Durch einen kleinen Hinweis, konnte ich auch dieses Problem meistern und das Histogram korrekt darstellen. Nun musste ich es noch mit dem Hover-Effekt auf der Karte zusammenfügen. Hier war die Performanz ein kleines Problem. Durch die Hilfe von Herr Soldati, konnte ich den Code leicht abändern, dass die Funktion performanter funktioniert.

Anschliessend habe ich das Ganze noch etwas gestyled und getestet.
