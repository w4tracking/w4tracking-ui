import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  WizardConfig,
  WizardStepConfig,
  WizardStepComponent,
  WizardStep,
  WizardEvent,
  WizardComponent
} from 'patternfly-ng/wizard';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Notification, NotificationAction, Notifications, NotificationType } from './../ngx-base';
import { UserService } from './../ngx-login-client';
import { Company, CompanyService } from './../ngx-w4tracking';

@Component({
  selector: 'w4-company-wizard',
  templateUrl: './company-wizard.component.html',
  styleUrls: ['./company-wizard.component.scss']
})
export class CompanyWizardComponent implements OnInit {

  @ViewChild('wizardTemplate') wizardTemplate: TemplateRef<any>;

  working = false;
  success = false;

  companyForm: FormGroup;
  termsAndConditionsForm: FormGroup;

  // Wizard
  wizardConfig: WizardConfig;

  // Wizard Step 1
  step1Config: WizardStepConfig;
  step1aConfig: WizardStepConfig;
  step1bConfig: WizardStepConfig;

  // Wizard Step 2
  step2Config: WizardStepConfig;
  step2aConfig: WizardStepConfig;
  step2bConfig: WizardStepConfig;

  // Modal
  private modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userService: UserService,
    private companyService: CompanyService,
    private notifications: Notifications
  ) {

  }

  ngOnInit() {
    this.initForm();
    this.initWizard();
  }

  initForm() {
    this.termsAndConditionsForm = this.formBuilder.group({
      agree: [false, Validators.compose([Validators.required])]
    });
    this.companyForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
      description: [null, Validators.compose([Validators.maxLength(250)])],
    });

    this.companyForm.statusChanges.subscribe((val) => {
      if (val === 'VALID') {
        this.step1aConfig.nextEnabled = true;
      } else if (val === 'INVALID') {
        this.step1aConfig.nextEnabled = false;
      } else {
        this.step1aConfig.nextEnabled = false;
        console.log('Invalid form status:' + val);
      }
      this.setNavAway(this.step1aConfig.nextEnabled);
    });

    this.termsAndConditionsForm.valueChanges.subscribe((val) => {
      this.step1bConfig.nextEnabled = (this.termsAndConditionsForm.value.agree === true);
      this.setNavAway(this.step1bConfig.nextEnabled);
    });
  }

  initWizard() {
    // Step 1
    this.step1Config = {
      id: 'step1',
      priority: 0,
      title: 'Compania'
    } as WizardStepConfig;
    this.step1aConfig = {
      id: 'step1a',
      expandReviewDetails: true,
      nextEnabled: false,
      priority: 0,
      title: 'Detalle'
    } as WizardStepConfig;
    this.step1bConfig = {
      id: 'step1b',
      expandReviewDetails: true,
      nextEnabled: false,
      priority: 0,
      title: 'Terminos y condiciones'
    } as WizardStepConfig;

    // Step 2
    this.step2Config = {
      id: 'step2',
      priority: 1,
      title: 'Revision'
    } as WizardStepConfig;
    this.step2aConfig = {
      id: 'step2a',
      nextEnabled: false,
      priority: 0,
      title: 'Resumen'
    } as WizardStepConfig;
    this.step2bConfig = {
      id: 'step2b',
      nextEnabled: false,
      priority: 1,
      title: 'Guardar'
    } as WizardStepConfig;

    // Wizard
    this.wizardConfig = {
      title: 'Crear Compania',
      cancelTitle: 'Cancelar',
      previousTitle: '< Anterior'
    } as WizardConfig;

    this.setNavAway(false);
  }

  // Wizard Methods
  nextClicked($event: WizardEvent): void {
    if ($event.step.config.id === 'step2b') {
      this.close();
    }
  }

  stepChanged($event: WizardEvent, wizard: WizardComponent) {
    const flatSteps = this.flattenWizardSteps(wizard);
    const currentStep = flatSteps.find(step => step.config.id === $event.step.config.id);
    if (currentStep) {
      currentStep.config.nextEnabled = true;
    }

    if ($event.step.config.id === 'step1a') {
      this.step1aConfig.nextEnabled = this.companyForm.valid;
      this.setNavAway(this.step1aConfig.nextEnabled);
      this.wizardConfig.nextTitle = 'Siguiente >';
    } else if ($event.step.config.id === 'step1b') {
      this.step1bConfig.nextEnabled = (this.termsAndConditionsForm.value.agree === true);
      this.setNavAway(this.step1bConfig.nextEnabled);
      this.wizardConfig.nextTitle = 'Siguiente >';
    } else if ($event.step.config.id === 'step2a') {
      this.wizardConfig.nextTitle = 'Crear';
    } else if ($event.step.config.id === 'step2b') {
      this.wizardConfig.nextTitle = 'Cerrar';
    } else {
      this.wizardConfig.nextTitle = 'Siguiente >';
    }
  }

  private setNavAway(allow: boolean) {
    this.step1aConfig.allowNavAway = allow;
    this.step2aConfig.allowNavAway = allow;

    this.step1Config.allowClickNav = allow;
    this.step1aConfig.allowClickNav = allow;
    this.step1bConfig.allowClickNav = allow;

    this.step2Config.allowClickNav = allow;
    this.step2aConfig.allowClickNav = allow;
    this.step2bConfig.allowClickNav = allow;
  }

  flattenWizardSteps(wizard: WizardComponent): WizardStep[] {
    const flatWizard: WizardStep[] = [];
    wizard.steps.forEach((step: WizardStepComponent) => {
      if (step.hasSubsteps) {
        step.steps.forEach(substep => {
          flatWizard.push(substep);
        });
      } else {
        flatWizard.push(step);
      }
    });
    return flatWizard;
  }

  save() {
    this.working = true;

    let transientCompany = this.createTransientCompany();
    Object.assign(transientCompany.attributes, this.companyForm.value);

    this.companyService.create(transientCompany).subscribe(
      (val) => {
        this.notifications.message(<Notification>{
          message: `Tu Nuevo Empresa fue creado!`,
          type: NotificationType.SUCCESS
        });
      },
      (err) => {
        this.notifications.message(<Notification>{
          message: `Hubo un problema al crear la empresa!`,
          type: NotificationType.DANGER
        });
      }
    );
  }

  createTransientCompany(): Company {
    return {
      attributes: {

      }
    } as Company;
  }

  // Modal
  open() {
    const defaultOptions = {
      class: 'modal-lg',
      keyboard: false,
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(this.wizardTemplate, defaultOptions);
  }

  cancel() {
    this.close();
  }

  close() {
    // clear wizard
    this.initForm();
    this.initWizard();
    this.modalRef.hide();
  }

}
