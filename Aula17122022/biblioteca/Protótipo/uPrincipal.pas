unit uPrincipal;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Grids, StdCtrls, ComCtrls;

type
  TForm1 = class(TForm)
    Label1: TLabel;
    ETitulo: TEdit;
    Label2: TLabel;
    EAutor: TEdit;
    Label3: TLabel;
    sgLivros: TStringGrid;
    EData: TDateTimePicker;
    btnInserir: TButton;
    lbNumLivrosCadastrados: TLabel;
    procedure FormCreate(Sender: TObject);
    procedure sgLivrosDrawCell(Sender: TObject; ACol, ARow: Integer;
      Rect: TRect; State: TGridDrawState);
    procedure btnInserirClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.FormCreate(Sender: TObject);
begin
  sgLivros.RowCount := 2;
  sgLivros.Cells[0, 0] := 'Código';
  sgLivros.Cells[1, 0] := 'Livro';
  sgLivros.Cells[2, 0] := 'Autor';
  sgLivros.Cells[3, 0] := 'Data';
  sgLivros.Cells[4, 0] := 'Ação';
end;

procedure TForm1.sgLivrosDrawCell(Sender: TObject; ACol, ARow: Integer;
  Rect: TRect; State: TGridDrawState);
begin
  if (ARow = 0) or (ACol = 3) then
  begin
    sgLivros.Canvas.FillRect(Rect);
    sgLivros.Canvas.TextOut(Rect.Left + ((Rect.Right - Rect.Left) - sgLivros.Canvas.TextWidth(sgLivros.Cells[ACol, ARow])) div 2,
      Rect.Top + 2, sgLivros.Cells[ACol, ARow]);
  end
  else if (ARow > 0) and (ACol = 4) then
  begin
    sgLivros.Canvas.FillRect(Rect);
    sgLivros.Canvas.Font.Style := sgLivros.Canvas.Font.Style + [fsBold];
    sgLivros.Canvas.TextOut(Rect.Left + ((Rect.Right - Rect.Left) - sgLivros.Canvas.TextWidth(sgLivros.Cells[ACol, ARow])) div 2,
      Rect.Top + 2, sgLivros.Cells[ACol, ARow]);
    sgLivros.Canvas.Font.Style := sgLivros.Canvas.Font.Style - [fsBold];
  end
  else
  begin
    sgLivros.Canvas.FillRect(Rect);
    sgLivros.Canvas.TextOut(Rect.Left + 5, Rect.Top + 2, sgLivros.Cells[ACol, ARow]);
  end;
end;

procedure TForm1.btnInserirClick(Sender: TObject);
begin
  if sgLivros.Cells[0, 1] <> '' then
    sgLivros.RowCount := sgLivros.RowCount + 1;
  sgLivros.Cells[0, sgLivros.RowCount - 1] := IntToStr(sgLivros.RowCount - 1);
  sgLivros.Cells[1, sgLivros.RowCount - 1] := ETitulo.Text;
  sgLivros.Cells[2, sgLivros.RowCount - 1] := EAutor.Text;
  sgLivros.Cells[3, sgLivros.RowCount - 1] := DateToStr(EData.Date);
  sgLivros.Cells[4, sgLivros.RowCount - 1] := 'Excluir';
  lbNumLivrosCadastrados.Caption := 'Número de livros cadastrados: ' + IntToStr(sgLivros.RowCount - 1);
end;

end.
