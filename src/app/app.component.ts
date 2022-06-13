import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { jqxSplitLayoutComponent } from 'jqwidgets-ng/jqxsplitlayout';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [`
		.jqx-split-layout-component {
			width: 100%;
			height: 400px
		}
		.jqx-list-box,
		.jqx-tree {
			border: 0;
			width: 100%;
			height: 100%;
			outline: none;
		}
	`]
})
export class AppComponent implements AfterViewInit {
    @ViewChild('myLayout', { static: false }) myLayout: jqxSplitLayoutComponent;

    dataSource = [
        {
            content: `<div id="tree"></div>`,
            size: 250
        },
        {
            orientation: "horizontal",
            items: [
                {
                    content: `<div id="tabs">
                        <ul>
                            <li>Text</li>
                            <li>Grid</li>
                        </ul>
                        <div style="overflow: hidden;">Lorem Ipsum dolor........</div>   
                        <div style="overflow: hidden;"><div id="jqxGrid"></div></div>   
                        </div>`,
                }, {
                    content: `<div id="listbox"></div>`,
                }
            ]
        }
    ]

    treeSource = [
        {
            icon: "https://www.jqwidgets.com/angular/images/mailIcon.png", label: "Mail", expanded: true, items: [
                { icon: "https://www.jqwidgets.com/angular/images/calendarIcon.png", label: "Calendar" },
                { icon: "https://www.jqwidgets.com/angular/images/contactsIcon.png", label: "Contacts", selected: true }
            ]
        },
        {
            icon: "https://www.jqwidgets.com/angular/images/folder.png", label: "Inbox", expanded: true, items: [
                { icon: "https://www.jqwidgets.com/angular/images/folder.png", label: "Admin" },
                { icon: "https://www.jqwidgets.com/angular/images/folder.png", label: "Corporate" },
                { icon: "https://www.jqwidgets.com/angular/images/folder.png", label: "Finance" },
                { icon: "https://www.jqwidgets.com/angular/images/folder.png", label: "Other" }
            ]
        },
        { icon: "https://www.jqwidgets.com/angular/images/recycle.png", label: "Deleted Items" },
        { icon: "https://www.jqwidgets.com/angular/images/notesIcon.png", label: "Notes" },
        { iconsize: 14, icon: "https://www.jqwidgets.com/angular/images/settings.png", label: "Settings" },
        { icon: "https://www.jqwidgets.com/angular/images/favorites.png", label: "Favorites" }
    ];

    setup(): void {
        const that = this;

        jqwidgets.createInstance(`#tree`, 'jqxTree', {
            source: that.treeSource, width: '100%', height: '100%'
        });

        jqwidgets.createInstance(`#listbox`, 'jqxListBox', {
            source: that.treeSource, width: '100%', height: '100%'
        });

        jqwidgets.createInstance(`#tabs`, 'jqxTabs', {
            width: '100%', height: '100%',
            initTabContent: this.initWidgets
        });
    }

    initWidgets = (tab: any) => {
        switch (tab) {
            case 1: //checks if seconds tabs is opened
                let source =
                {
                    datatype: 'array',
                    datafields: [
                        { name: 'Name' },
                        { name: 'Product' },
                        { name: 'Quantity' }
                    ],
                    localdata: [
                        { Name: 'Nancy', Product: 'Coffee', Quantity: '2' },
                        { Name: 'Andrew', Product: 'Apples', Quantity: '3' },
                        { Name: 'Janet', Product: 'Carrots', Quantity: '4' },
                        { Name: 'Margaret', Product: 'Pumpkins', Quantity: '5' },
                    ]
                };
                let dataAdapter = new jqx.dataAdapter(source, { async: false });
                let myGrid: jqwidgets.jqxGrid = jqwidgets.createInstance('#jqxGrid', 'jqxGrid', {
                    width: '100%',
                    height: '84%',
                    source: dataAdapter,
                    columns: [
                        { text: 'Name', datafield: 'Name',},
                        { text: 'Product', datafield: 'Product', },
                        { text: 'Quantity', datafield: 'Quantity' }
                    ]
                });
                break;
        }
    };

    ngAfterViewInit(): void {
        const that = this;

        if (document.readyState === "complete") {
            that.setup();
        }
        else {
            window.onload = function () {
                that.setup();
            }
        }
    }
}