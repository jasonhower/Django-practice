from django.contrib import admin
from .models import RegistrationTable,SupplierPayment
# Register your models here.
class RegistrationTableAdmin(admin.ModelAdmin):
    search_fields = ('id','max_num', 'applicant','company_name','supplier_name')
    list_display = ('id','max_num','record_date', 'applicant', 'company_name','supplier_name')
    list_filter = ('company_name',)
    ordering = ('record_date',)
# class SupplierPaymentAdmin(admin.ModelAdmin):
#     search_fields = ('id','max_num', 'applicant','company_name','supplier_name')
#     list_display = ('id','record_date', 'applicant', 'company_name','supplier_name')
#     list_filter = ('company_name',)
#     ordering = ('record_date',)
class SupplierPaymentAdmin(admin.ModelAdmin):
    search_fields = ('id','supplier_name', 'company_name','bank_of_deposit')
    list_display = ('id','supplier_name', 'company_name', 'bank_of_deposit','closing_date','bank_account','payment_date')
    list_filter = ('company_name',)
    ordering = ('id',)


admin.site.register(RegistrationTable,RegistrationTableAdmin)
admin.site.register(SupplierPayment,SupplierPaymentAdmin)