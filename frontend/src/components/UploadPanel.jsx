export default function UploadPanel({ onFileSelect, previewUrl, loading, error }) {
  const handleChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="card upload-card">
      <label className="upload-area">
        <input type="file" accept="image/*" onChange={handleChange} />
        <span className="upload-title">Drop a food photo or click to upload</span>
        <span className="upload-sub">JPG or PNG. Max 5MB.</span>
      </label>
      {loading && <div className="upload-sub">Analyzing image...</div>}
      {previewUrl ? (
        <div className="upload-preview">
          <img src={previewUrl} alt="Selected food" />
        </div>
      ) : (
        <div className="upload-placeholder">Preview appears here</div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
