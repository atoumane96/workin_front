
import {Component, OnInit} from '@angular/core';

declare var $: any
declare var CanvasJS: any
declare var Math: Math;

@Component({
  selector: 'app-ndashio',
  templateUrl: './ndashio.component.html',
  styleUrls: ['./ndashio.component.css']
})
export class NdashioComponent implements OnInit {
  number1 = 18;

  constructor() {
  }

  ngOnInit() {
    this.chartJs();
    this.load();
  }


  load() {
    $('.section').hide();
    setTimeout(() => {
      $('.section').fadeIn();
      $('#loading').fadeOut();
      //fonction pour faire le compte des stats
      $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
          },
          {
            duration: 2000,
            easing: 'swing',
            step: (now) => {
              $(this).text(Math.ceil(now));
            }
          });
      });
    }, 1000);
  }


  chartJs() {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Diagrammes des Activites",
        horizontalAlign: "left"
      },
      data: [{
        type: "doughnut",
        startAngle: 100,
        innerRadius: 10,
        indexLabelFontSize: 20,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
          {y: 48, label: "ARCHIVES"},
          {y: 29, label: "MESSAGES"},
          {y: 40, label: "FICHIERS"},
          {y: 7, label: "UTILISATEURS"},
        ]
      }]
    });
    chart.render();
  }

}
