
function InterestInputBox() {
    return (    
    <div className="hwc-interests">
<div className="hwc-area">
   
    <form id="interests-form" className="rlt-interests-form" action="#">
        <input id="rlt-interests-input" type="text" aria-label="interests" placeholder="Add your interests" data-ddg-inputtype="unknown" />
        <input type="submit" hidden />
    </form>
</div>
<div className="hwc-available" style={{ display: 'none' }}>
    <div className="hwca-list"></div>
</div>
        </div>
    )

}

export default InterestInputBox