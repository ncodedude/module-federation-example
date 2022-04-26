import { HttpClient } from '@angular/common/http';
import {
  Component,
  ViewChild,
  ViewContainerRef,
  Inject,
  Injector,
  ComponentFactoryResolver,
  OnInit,
} from '@angular/core';
import { AuthLibService } from 'auth-lib';
import { EventBus } from 'event-bus';
import { TranslateService } from '@ngx-translate/core';

export const DATA: any[] = [
  {
    ProductID: 1,
    ProductName: 'Chai',
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: '10 boxes x 20 bags',
    UnitPrice: 18.0,
    UnitsInStock: 39,
    UnitsOnOrder: 30,
    ReorderLevel: 10,
    Discontinued: false,
    OrderDate: new Date('2012-02-12'),
  },
  {
    ProductID: 2,
    ProductName: 'Chang',
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: '24 - 12 oz bottles',
    UnitPrice: 19.0,
    UnitsInStock: 17,
    UnitsOnOrder: 40,
    ReorderLevel: 25,
    Discontinued: true,
    OrderDate: new Date('2003-03-17'),
  },
  {
    ProductID: 3,
    ProductName: 'Aniseed Syrup',
    SupplierID: 1,
    CategoryID: 2,
    QuantityPerUnit: '12 - 550 ml bottles',
    UnitPrice: 10.0,
    UnitsInStock: 13,
    UnitsOnOrder: 70,
    ReorderLevel: 25,
    Discontinued: false,
    OrderDate: new Date('2006-03-17'),
  },
  {
    ProductID: 4,
    ProductName: 'Chef Antons Cajun Seasoning',
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: '48 - 6 oz jars',
    UnitPrice: 22.0,
    UnitsInStock: 53,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: false,
    OrderDate: new Date('2016-03-17'),
  },
  {
    ProductID: 5,
    ProductName: 'Chef Antons Gumbo Mix',
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: '36 boxes',
    UnitPrice: 21.35,
    UnitsInStock: 0,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: true,
    OrderDate: new Date('2011-11-11'),
  },
  {
    ProductID: 6,
    ProductName: 'Grandmas Boysenberry Spread',
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: '12 - 8 oz jars',
    UnitPrice: 25.0,
    UnitsInStock: 0,
    UnitsOnOrder: 30,
    ReorderLevel: 25,
    Discontinued: false,
    OrderDate: new Date('2017-12-17'),
  },
  {
    ProductID: 7,
    ProductName: 'Uncle Bobs Organic Dried Pears',
    SupplierID: 3,
    CategoryID: 7,
    QuantityPerUnit: '12 - 1 lb pkgs.',
    UnitPrice: 30.0,
    UnitsInStock: 150,
    UnitsOnOrder: 30,
    ReorderLevel: 10,
    Discontinued: false,
    OrderDate: new Date('2016-07-17'),
  },
  {
    ProductID: 8,
    ProductName: 'Northwoods Cranberry Sauce',
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: '12 - 12 oz jars',
    UnitPrice: 40.0,
    UnitsInStock: 6,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: false,
    OrderDate: new Date('2018-01-17'),
  },
  {
    ProductID: 9,
    ProductName: 'Mishi Kobe Niku',
    SupplierID: 4,
    CategoryID: 6,
    QuantityPerUnit: '18 - 500 g pkgs.',
    UnitPrice: 97.0,
    UnitsInStock: 29,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: true,
    OrderDate: new Date('2010-02-17'),
  },
  {
    ProductID: 10,
    ProductName: 'Ikura',
    SupplierID: 4,
    CategoryID: 8,
    QuantityPerUnit: '12 - 200 ml jars',
    UnitPrice: 31.0,
    UnitsInStock: 31,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: false,
    OrderDate: new Date('2008-05-17'),
  },
  {
    ProductID: 11,
    ProductName: 'Queso Cabrales',
    SupplierID: 5,
    CategoryID: 4,
    QuantityPerUnit: '1 kg pkg.',
    UnitPrice: 21.0,
    UnitsInStock: 22,
    UnitsOnOrder: 30,
    ReorderLevel: 30,
    Discontinued: false,
    OrderDate: new Date('2009-01-17'),
  },
  {
    ProductID: 12,
    ProductName: 'Queso Manchego La Pastora',
    SupplierID: 5,
    CategoryID: 4,
    QuantityPerUnit: '10 - 500 g pkgs.',
    UnitPrice: 38.0,
    UnitsInStock: 86,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: false,
    OrderDate: new Date('2015-11-17'),
  },
  {
    ProductID: 13,
    ProductName: 'Konbu',
    SupplierID: 6,
    CategoryID: 8,
    QuantityPerUnit: '2 kg box',
    UnitPrice: 6.0,
    UnitsInStock: 24,
    UnitsOnOrder: 30,
    ReorderLevel: 5,
    Discontinued: false,
    OrderDate: new Date('2015-03-17'),
  },
  {
    ProductID: 14,
    ProductName: 'Tofu',
    SupplierID: 6,
    CategoryID: 7,
    QuantityPerUnit: '40 - 100 g pkgs.',
    UnitPrice: 23.25,
    UnitsInStock: 35,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: false,
    OrderDate: new Date('2017-06-17'),
  },
  {
    ProductID: 15,
    ProductName: 'Genen Shouyu',
    SupplierID: 6,
    CategoryID: 2,
    QuantityPerUnit: '24 - 250 ml bottles',
    UnitPrice: 15.5,
    UnitsInStock: 39,
    UnitsOnOrder: 30,
    ReorderLevel: 5,
    Discontinued: false,
    OrderDate: new Date('2014-03-17'),
  },
  {
    ProductID: 16,
    ProductName: 'Pavlova',
    SupplierID: 7,
    CategoryID: 3,
    QuantityPerUnit: '32 - 500 g boxes',
    UnitPrice: 17.45,
    UnitsInStock: 29,
    UnitsOnOrder: 30,
    ReorderLevel: 10,
    Discontinued: false,
    OrderDate: new Date('2018-03-28'),
  },
  {
    ProductID: 17,
    ProductName: 'Alice Mutton',
    SupplierID: 7,
    CategoryID: 6,
    QuantityPerUnit: '20 - 1 kg tins',
    UnitPrice: 39.0,
    UnitsInStock: 0,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: true,
    OrderDate: new Date('2015-08-17'),
  },
  {
    ProductID: 18,
    ProductName: 'Carnarvon Tigers',
    SupplierID: 7,
    CategoryID: 8,
    QuantityPerUnit: '16 kg pkg.',
    UnitPrice: 62.5,
    UnitsInStock: 42,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: false,
    OrderDate: new Date('2005-09-27'),
  },
  {
    ProductID: 19,
    ProductName: 'Teatime Chocolate Biscuits',
    SupplierID: 8,
    CategoryID: 3,
    QuantityPerUnit: '',
    UnitPrice: 9.2,
    UnitsInStock: 25,
    UnitsOnOrder: 30,
    ReorderLevel: 5,
    Discontinued: false,
    OrderDate: new Date('2001-03-17'),
  },
  {
    ProductID: 20,
    ProductName: 'Sir Rodneys Marmalade',
    SupplierID: 8,
    CategoryID: 3,
    QuantityPerUnit: undefined,
    UnitPrice: 4.5,
    UnitsInStock: 40,
    UnitsOnOrder: 30,
    ReorderLevel: 0,
    Discontinued: false,
    OrderDate: new Date('2005-03-17'),
  },
];

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
})
export class FlightsSearchComponent {
  tema: string;
  public data: any[];

  public options = {
    enabled: true,
    copyHeaders: true,
    copyFormatters: true,
    separator: '\t',
  };

  constructor(private eventBus: EventBus, public translate: TranslateService) {
    this.data = DATA;
    // Register translation languages
    translate.addLangs(['en', 'es']);
    // Set default language
    translate.setDefaultLang('en');

    this.eventBus.on('SEND_TEST').subscribe((data) => {
      debugger;
      this.tema = JSON.stringify(data);
    });

    this.eventBus.on('SET_LOCATION').subscribe((data: any) => {
      console.log(data._data);
      translate.use(data._data);
    });
  }

  public formatter = (value: any) => `** ${value} **`;

  public initColumn(column) {
    column.formatter = this.formatter;
    column.header = `🎉${column.field}`;
    if (column.index > 6) {
      column.hidden = true;
    }
  }

  getEvent() {
    debugger;
    this.eventBus.emit('GET_TEST', {});
  }
}
