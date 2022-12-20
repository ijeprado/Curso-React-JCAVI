program Bilbioteca;

uses
  Forms,
  uPrincipal in 'uPrincipal.pas' {Form1},
  uAssinaturaDigital in 'C:\Workspace\lib\Externos\AssinaturaDigital\uAssinaturaDigital.pas',
  dlgSelecionaCertificadoPDF in 'C:\Workspace\lib\Externos\AssinaturaDigital\dlgSelecionaCertificadoPDF.pas' {FormSelecionaCertificadoPDF};

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.
