




class MangaStatus < ActiveRecord::Base

  validates :status, inclusion: { in: %w(Read Want-To-Read Currently-Reading)}
  validates :manga_id, uniqueness: true

  belongs_to :user
  belongs_to :manga

  def self.changer(title, manga_id, user_id)
    record = MangaStatus.where(user_id: user_id, manga_id: manga_id).ids
    if !record.empty? # if the record is NOT empty, proceed with this code
      prev_title = MangaStatus.where(user_id: user_id, manga_id: manga_id).pluck(:status)
      shelf_id = Bookshelf.where(title: prev_title, user_id: user_id).ids
      shelf_with_comic = MangaBookshelf.where(manga_id: manga_id, bookshelf_id: shelf_id).ids
      MangaStatus.delete(record[0])
      MangaBookshelf.delete(shelf_with_comic[0])
    end

    @status = MangaStatus.create(user_id: user_id, manga_id: manga_id, status: title)
    new_id = Bookshelf.where(title: title, user_id: user_id).ids
    MangaBookshelf.create(manga_id: manga_id, bookshelf_id: new_id[0])
    return @status
  end
end
