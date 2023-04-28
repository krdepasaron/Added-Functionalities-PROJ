import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-show-parts',
  templateUrl: './show-parts.component.html',
  styleUrls: ['./show-parts.component.css']
})
export class ShowPartsComponent implements OnInit {

  constructor(private service: ApiService) {}

   //newly added code ** 
   page: number = 1;
   count: number = 0;
   tableSize: number = 10;
   tableSizes: any = [10, 15, 20, 50];
   PartsNameFilter: string = "";
 
   fileName: string= 'PCParts2023.xlsx';
   // end of newly added code **

  PartsList:any=[];
  AddEditModalTitle: string= " ";
  ActivateAddEditPartsComponent: boolean = false;
  ActivateBuildPartsComponent: boolean = false;
  BuildModalTitle: String = "";
  part:any;
  ngOnInit(): void {
    this.refreshPartsList();
  }

  addClick() {
    this.part={
      id:0,
      tableName: "",
      name: "",
      code: "",
      brand:"",
      unitPrice:0
    }

    this.AddEditModalTitle="Add PC Parts";
    this.ActivateAddEditPartsComponent=true;
  }

  closeClick() {
    this.ActivateAddEditPartsComponent=false;
    this.refreshPartsList();
  }

  editClick(item:any) {
    this.part=item;
    this.AddEditModalTitle="Edit PC Parts";
    this.ActivateAddEditPartsComponent=true;
  }
  
  deleteClick(item: any) {
    console.log("deleteClick() called with item:", item);
    const data = {
      tableName: item.category,
      id: item.id
    };
    console.log("data to be sent:", data);
    if (confirm('Confirm to Delete?')) {
      this.service.deleteParts(data).subscribe(
        (response) => {
          console.log("deleteParts() returned response:", response);
          alert("The part has been deleted.");
          this.refreshPartsList();
        },
        (error) => {
          console.log("deleteParts() returned error:", error);
          alert("Failed to delete the part. Please try again later.");
        }
      );
    }
  }
  
  buildClick() {
    this.part={
      tableName: "",
      name: "",
    unitPrice:0}
    this.BuildModalTitle="PC Build Price";
    this.ActivateBuildPartsComponent=true;
  }

  refreshPartsList() {
    this.service.getPartsList().subscribe(data=>{
      this.PartsList = data;
    })
  } 

  //newly added codes

  getCases() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'CASES');
    });
  }

  getCPU() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'CPU');
    });
  }

  getFans() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'FANS');
    });
  }

  getGPU() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'GPU');
    });
  }

  getMOBO() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'MOBO');
    });
  }

  getRam() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'RAM');
    });
  }

  getPSU() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'PSU');
    });
  }

  getSSD() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.category === 'SSD');
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.refreshPartsList();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.refreshPartsList();
  }

  searchFilter() {
    this.service.getPartsList().subscribe(data => { 
      this.PartsList = data.filter(part => part.name.toLowerCase().includes(this.PartsNameFilter.toLowerCase()));
    });
  }

  exportToExcel() {

     /* pass here the table id */
     let element = document.getElementById('pcparts2023');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
     /* save to file */  
     XLSX.writeFile(wb, this.fileName);

  }
  // end of newly added codes
}