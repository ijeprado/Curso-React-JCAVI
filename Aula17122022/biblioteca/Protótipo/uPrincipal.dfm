object Form1: TForm1
  Left = 289
  Top = 243
  Width = 705
  Height = 407
  Caption = 'Biblioteca'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnCreate = FormCreate
  DesignSize = (
    689
    368)
  PixelsPerInch = 96
  TextHeight = 13
  object Label1: TLabel
    Left = 25
    Top = 18
    Width = 31
    Height = 13
    Caption = 'T'#237'tulo:'
  end
  object Label2: TLabel
    Left = 25
    Top = 44
    Width = 28
    Height = 13
    Caption = 'Autor:'
  end
  object Label3: TLabel
    Left = 25
    Top = 70
    Width = 26
    Height = 13
    Caption = 'Data:'
  end
  object lbNumLivrosCadastrados: TLabel
    Left = 345
    Top = 18
    Width = 118
    Height = 13
    Caption = 'Nenhum livro cadastrado'
  end
  object ETitulo: TEdit
    Left = 61
    Top = 13
    Width = 235
    Height = 21
    TabOrder = 0
  end
  object EAutor: TEdit
    Left = 61
    Top = 39
    Width = 235
    Height = 21
    TabOrder = 1
  end
  object sgLivros: TStringGrid
    Left = 17
    Top = 134
    Width = 654
    Height = 218
    Anchors = [akLeft, akTop, akRight, akBottom]
    DefaultRowHeight = 18
    FixedCols = 0
    TabOrder = 4
    OnDrawCell = sgLivrosDrawCell
    ColWidths = (
      76
      215
      171
      97
      64)
  end
  object EData: TDateTimePicker
    Left = 61
    Top = 66
    Width = 92
    Height = 21
    TabOrder = 2
  end
  object btnInserir: TButton
    Left = 20
    Top = 94
    Width = 75
    Height = 25
    Caption = 'Inserir'
    TabOrder = 3
    OnClick = btnInserirClick
  end
end
