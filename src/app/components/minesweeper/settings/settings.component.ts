import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Dimensions } from "src/app/models/dimensions.model";
import { GameType } from "src/app/enums/game-type.enum";

@Component({
    templateUrl: './settings.component.html',
    styles: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    public form: FormGroup
    public GameType = GameType
    public dimensions: Dimensions
    public showCustom: boolean = false
    
    constructor(
        private formBuidler: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<SettingsComponent>
    ) { 
        this.dimensions = new Dimensions()
        this.dimensions.width = 20
        this.dimensions.height = 20
        this.dimensions.mines = 20
        this.form = this.formBuidler.group({
            width: [this.dimensions.width, Validators.required],
            height: [this.dimensions.height, Validators.required],
            mines: [this.dimensions.mines, Validators.required]
        })
    }

    ngOnInit() { }

    save() {
        if(this.form.valid) {
            this.dimensions.width = this.form.controls.width.value 
            this.dimensions.height = this.form.controls.height.value 
            this.dimensions.mines = this.form.controls.mines.value 
            this.dialogRef.close(this.dimensions)
        }
    }

    selectGame(gameType: GameType) {
        switch(gameType) {
            case GameType.EASY :
                this.dimensions.width = 9
                this.dimensions.height = 9
                this.dimensions.mines = 10
                break;
            case GameType.NORMAL :
                this.dimensions.width = 16
                this.dimensions.height = 16
                this.dimensions.mines = 40
                break;
            case GameType.HARD :
                this.dimensions.width = 30
                this.dimensions.height = 16
                this.dimensions.mines = 99
                break;
        }
        this.dialogRef.close(this.dimensions)
    }

    ngOnDestroy() { }
}