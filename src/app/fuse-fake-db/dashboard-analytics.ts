export class AnalyticsDashboardDb
{
    public static widgets = {
        widget5: {
            chartType: 'line',
            datasets : {
                'yesterday': [
                    {
                        label: 'Visitors',
                        data : [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320],
                        fill : 'start'

                    },
                    {
                        label: 'Page views',
                        data : [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100],
                        fill : 'start'
                    }
                ],
                'today'    : [
                    {
                        label: 'Visitors',
                        data : [410, 380, 320, 290, 190, 390, 250, 380, 300, 340, 220],
                        fill : 'start'
                    },
                    {
                        label: 'Page Views',
                        data : [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500],
                        fill : 'start'

                    }
                ]
            },
            labels   : [
                '1', '3', '6', '9', '12', '15', '18', '21', '24', '27', '30'
            ],
            colors   : [
                {
                    borderColor              : '#3949ab',
                    backgroundColor          : '#3949ab',
                    pointBackgroundColor     : '#3949ab',
                    pointHoverBackgroundColor: '#3949ab',
                    pointBorderColor         : '#ffffff',
                    pointHoverBorderColor    : '#ffffff'
                },
                {
                    borderColor              : 'rgba(30, 136, 229, 0.87)',
                    backgroundColor          : 'rgba(30, 136, 229, 0.87)',
                    pointBackgroundColor     : 'rgba(30, 136, 229, 0.87)',
                    pointHoverBackgroundColor: 'rgba(30, 136, 229, 0.87)',
                    pointBorderColor         : '#ffffff',
                    pointHoverBorderColor    : '#ffffff'
                }
            ],
            options  : {
                spanGaps           : false,
                legend             : {
                    display: false
                },
                maintainAspectRatio: false,
                tooltips           : {
                    position : 'nearest',
                    mode     : 'index',
                    intersect: false
                },
                layout             : {
                    padding: {
                        left : 24,
                        right: 32
                    }
                },
                elements           : {
                    point: {
                        radius          : 4,
                        borderWidth     : 2,
                        hoverRadius     : 4,
                        hoverBorderWidth: 2
                    }
                },
                scales             : {
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            },
                            ticks    : {
                                fontColor: 'rgba(0,0,0,0.54)'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                tickMarkLength: 16
                            },
                            ticks    : {
                                stepSize: 1000
                            }
                        }
                    ]
                },
                plugins            : {
                    filler: {
                        propagate: false
                    }
                }
            }
        }
    };
}
