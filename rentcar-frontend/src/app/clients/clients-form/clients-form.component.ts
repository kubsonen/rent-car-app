import {Component, OnInit} from '@angular/core';
import {TopbarActions} from '../../layout/topbar/topbar.component';
import {TopbarService} from '../../layout/topbar/topbar.service';
import {Client} from '../../core/model/client.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../../core/service/clients.service';
import {FormMode} from '../../layout/form/form-mode.enum';
import {TranslateService} from '@ngx-translate/core';
import {ConstantValuesService} from '../../core/abstract/constant-values-service';
import {BundlePropertyService} from '../../core/service/bundle-property.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  private error: any;
  private client: Client;
  private uid: string;
  mode: FormMode;
  formMode: any = FormMode;

  constructor(private topbarService: TopbarService,
              private clientService: ClientsService,
              private route: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private bundlePropertyService: BundlePropertyService) {

    this.initTopbarActions();
    this.route.params.subscribe(p => this.uid = p.uid);
    if (this.uid !== undefined) {
      this.clientService.getById(this.uid).subscribe(value => this.client = value);
      this.mode = FormMode.EDIT;
    } else {
      this.client = new Client();
      this.mode = FormMode.ADD;
    }

  }

  ngOnInit() {

  }

  private initTopbarActions() {
    this.topbarService.setAcions(TopbarActions.formActions(() => {
      if (this.mode === FormMode.ADD) {
        this.clientService.post(this.client).subscribe(value => {
          this.router.navigate(['clients']);
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        });
      } else if (this.mode === FormMode.EDIT) {
        this.clientService.put(this.client).subscribe(value => {
          this.router.navigate(['clients']);
        }, error => {
          if (error.status === 406) {
            this.error = error.error;
          } else {
            throw error;
          }
        });
      }

    }));
  }
}
