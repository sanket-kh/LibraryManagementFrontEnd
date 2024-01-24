import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminAccService} from "../services/AdminAccService";
import {AccDetailsReq} from "../admin-modals/requests/AccDetailsReq";
import {Router} from "@angular/router";
import {RegexConstants} from "../../constants/regex-constants";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import {CustomValidatorService} from "../../UserComponents/services/CustomValidators";

@Component({
  selector: 'app-admin-acc-setup',
  templateUrl: './admin-acc-setup.component.html',
  styleUrl: './admin-acc-setup.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AdminAccSetupComponent implements OnInit {

  allAccountTypes: string[] = []
  accTypesToShow: string[] = []
  accTypeToRemove: string = ''
  associatedOrganization: string[][] = []
  protected accountDetails: FormGroup = new FormGroup<any>({})
  adminAccService: AdminAccService = inject(AdminAccService)
  router: Router = inject(Router)
  account?: AccDetailsReq = undefined
  currentIndex: number = 0
  populatingIndex:number = 0
  selectedAccountTypes: string[] = []
  protected toastMessage: string = '';
  protected showToast: boolean = false;


  onSubmit() {
    console.log(this.accounts.value)
    if (this.adminAccService.adminAccDetails) {
      this.adminAccService.updateAccDetails(this.accounts.value).subscribe({
        next: response => {
          this.showToastWithMessage(response.message as string)
          this.navigateBack()
        }, error: err => {
          console.log(err)
          let error: HttpErrorResponse = err
          let defaultResponse: DefaultResponse = error.error
          this.showToastWithMessage(defaultResponse.message as string)
        }
      })
    } else {
      this.adminAccService.addAccDetails(this.accounts.value).subscribe({
        next: response => {
          this.showToastWithMessage(response.message as string)
          this.navigateBack()
        }, error: err => {
          console.log(err)
          let error: HttpErrorResponse = err
          let defaultResponse: DefaultResponse = error.error
          this.showToastWithMessage(defaultResponse.message as string)

        }
      })
    }

  }

  showToastWithMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
  }

  navigateBack() {
    setTimeout(() => {
      this.router.navigate(['admin', 'acc-details']).then()
    }, 850)
  }


  ngOnInit(): void {
    this.toastMessage=''
    this.getAccountTypes()
    this.accountDetails = new FormGroup({
      accounts: new FormArray([])
    })
    if (this.adminAccService.adminAccDetails) {
     while (this.populatingIndex < this.adminAccService.adminAccDetails.length){
        this.populateData()
        this.selectedAccountTypes.push(this.adminAccService.adminAccDetails[this.populatingIndex].accountTypeName)
        this.updateAccTypesToShowList()
        this.getAccAssociatedOrganization(this.adminAccService.adminAccDetails[this.populatingIndex].accountTypeName,this.populatingIndex)
        this.populatingIndex++
      }
      this.currentIndex = this.adminAccService.adminAccDetails.length-1

    } else {
      this.accountDetails = new FormGroup({
        accounts: new FormArray([
          new FormGroup({
            accountTypeName: new FormControl<string>('', [Validators.required]),
            accountAssociatedOrganizationName: new FormControl<string>('', [Validators.required]),
            accountName: new FormControl<string>('', [Validators.required,
              CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
              CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
              CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
              CustomValidatorService.containingPatternValidator(RegexConstants.moreThanOneSpaceInBetween, {extraSpaceBetween: true}),
              CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
              CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true}
              )
            ]),
            accountNumber: new FormControl<number | null>(null, [Validators.required, Validators.pattern(RegexConstants.accountNumberRegex)]),
          })
        ])
      })
    }

  }

  populateData() {
    if (this.adminAccService.adminAccDetails) {
      const newGroup = new FormGroup({
        accountTypeName: new FormControl<string>(this.adminAccService.adminAccDetails[this.populatingIndex].accountTypeName, [Validators.required]),
        accountAssociatedOrganizationName: new FormControl<string>(this.adminAccService.adminAccDetails[this.populatingIndex].accountAssociatedOrganizationName, [Validators.required]),
        accountName: new FormControl<string>(this.adminAccService.adminAccDetails[this.populatingIndex].accountName, [Validators.required,
          CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
          CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
          CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
          CustomValidatorService.containingPatternValidator(RegexConstants.moreThanOneSpaceInBetween, {extraSpaceBetween: true}),
          CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
          CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true}
          )
        ]),
        accountNumber: new FormControl<number | null>(this.adminAccService.adminAccDetails[this.populatingIndex].accountNumber, [Validators.required,Validators.pattern(RegexConstants.accountNumberRegex)]),
      })
      this.accounts.push(newGroup)
    }

  }

  get accounts() {
    return this.accountDetails.get('accounts') as FormArray
  }

  createAccount(): FormGroup {
    return new FormGroup({
      accountTypeName: new FormControl('', [Validators.required]),
      accountAssociatedOrganizationName: new FormControl('', [Validators.required]),
      accountName: new FormControl('', [Validators.required,
        CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.moreThanOneSpaceInBetween, {extraSpaceBetween: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true}
        )
      ]),
      accountNumber: new FormControl('', [Validators.required, Validators.pattern(RegexConstants.accountNumberRegex)]),
    })
  }

  addMore() {
    this.selectedAccountTypes.push(this.accTypeToRemove)
    this.updateAccTypesToShowList()
    this.accounts.push(this.createAccount())
    this.currentIndex++
  }

  getAccountTypes() {
    this.adminAccService.getAllAccTypes().subscribe({
      next: response => {
        this.allAccountTypes = response.responseBody as string[]
        console.log(this.allAccountTypes)
        this.updateAccTypesToShowList()
      }
    })
  }

  getAccAssociatedOrganization(accountTypeName: string, index: number) {
    this.adminAccService.getOrgNamesByAccType(accountTypeName).subscribe({
      next: response => {
        this.associatedOrganization[index] = response.responseBody as string[]
        console.log(this.associatedOrganization)
      }
    })
  }

  updateAccTypesToShowList() {
    this.accTypesToShow = this.allAccountTypes.filter(x => !this.selectedAccountTypes.includes(x))
  }

  selected(account: AbstractControl<any>, i: number) {
    console.log(account.get('accountTypeName')?.value)
    let type = account.get('accountTypeName')?.value
    this.getAccAssociatedOrganization(type, i)
    this.selectedAccountTypes[i] = type
    this.updateAccTypesToShowList()

  }

  removeIndex(account: AbstractControl<any>, index: number) {
    this.accounts.removeAt(index)
    let removed = account.get('accountTypeName')?.value as string
    this.selectedAccountTypes = this.selectedAccountTypes.filter(e => e !== removed)
    this.associatedOrganization[index] = []
    this.updateAccTypesToShowList()
    this.currentIndex--
  }

  resetForm() {
    this.accountDetails.reset()
    this.selectedAccountTypes = []
    this.accTypesToShow = this.allAccountTypes
    while (this.currentIndex > 0) {
      this.accounts.removeAt(this.currentIndex)
      this.currentIndex--
    }
  }
}
