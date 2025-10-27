package main

type User struct {
	Id                 *int    `gorm:"column:id"`
	Email              *string `gorm:"column:email"`
	Role               string  `gorm:"column:role"`
	ResetPasswordToken *string `gorm:"column:reset_token"`
	ResetRequestedWhen int64   `gorm:"column:reset_requested_when"`
	PasswordHash       *string `gorm:"column:password_hash"`
	SignUpToken        *string `gorm:"column:signup_token"`
	SubscribedTill     int64   `gorm:"column:subscribed_till"`
}

type Note struct {
	Duration  int                 `json:"duration,omitempty"`
	NoteType  *string             `json:"noteType,omitempty" gorm:"type:text"`
	NoteValue int                 `json:"noteValue,omitempty"`
	NoteName  *string             `json:"noteName,omitempty"`
	ChordName *string             `json:"chordName,omitempty"`
	Fingers   *map[string]*Finger `json:"fingers,omitempty"`
}

type Finger struct {
	Finger *string `json:"finger,omitempty"`
	Button int     `json:"button,omitempty"`
}

type Point struct {
	Timestamp int     `json:"timestamp,omitempty"`
	OffsetX   int     `json:"offsetX,omitempty"`
	Bar       int     `json:"bar,omitempty"`
	NotesOn   []*Note `json:"notesOn,omitempty"`
	NotesOff  []*Note `json:"notesOff,omitempty"`
}

type Tune struct {
	Id              *int    `json:"id,omitempty"`
	OwnerId         int     `json:"ownerId,omitempty" gorm:"column:owner_id"`
	Title           *string `json:"title,omitempty"`
	Author          *string `json:"author,omitempty"`
	Instrument      *string `json:"instrument,omitempty" gorm:"type:text"`
	Cover           *string `json:"cover,omitempty"`
	Png             []byte  `json:"png,omitempty"`
	PngWidth        int     `json:"pngWidth,omitempty"`
	PngHeight       int     `json:"pngHeight,omitempty"`
	Mp3             []byte  `json:"mp3,omitempty"`
	Json            *string `json:"json,omitempty"`
	Mscx            *string `json:"mscx,omitempty"`
	LevelNum        int     `json:"levelNum,omitempty" gorm:"column:level_num"`
	PositionNum     int     `json:"positionNum,omitempty" gorm:"column:position_num"`
	LastUpdatedOn   *int64  `json:"lastUpdatedOn,omitempty" gorm:"column:last_updated_on"`
	SelectionRanges *string `json:"selectionRanges,omitempty" gorm:"column:selection_ranges"`

	BarOffsets    []int    `json:"barOffsets,omitempty" gorm:"-"`
	Points        []*Point `json:"points,omitempty" gorm:"-"`
	SheetWidth    int      `json:"sheetWidth,omitempty" gorm:"-"`
	SheetHeight   int      `json:"sheetHeight,omitempty" gorm:"-"`
	PlayHeadWidth int      `json:"playHeadWidth,omitempty" gorm:"-"`
}

type Stats struct {
	Id           int   `json:"id,omitempty"`
	TuneId       int64 `gorm:"column:tune_id"`
	UserId       int64 `gorm:"column:user_id"`
	BestScore    int   `gorm:"column:best_score"`
	Performances *string
	Credits      int `gorm:"column:credits"`
}

type BrevoExtendedEmail struct {
	Name  string `json:"name,omitempty"`
	Email string `json:"email,omitempty"`
}

type StatsRecord struct {
	Date *string `json:"date,omitempty"`
	Lh   *string `json:"lh,omitempty"`
	Rh   *string `json:"rh,omitempty"`
}
